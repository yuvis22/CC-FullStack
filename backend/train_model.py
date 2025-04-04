import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.preprocessing import StandardScaler, RobustScaler
from sklearn.metrics import classification_report, confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score
import xgboost as xgb
import joblib
import warnings
warnings.filterwarnings('ignore')

# Load the dataset
print("Loading dataset...")
df = pd.read_csv('creditcard.csv')
print(f"Dataset shape: {df.shape}")
print("\nClass distribution:")
print(df['Class'].value_counts(normalize=True))

# Feature engineering
print("\nPerforming advanced feature engineering...")

# Basic features
df['Amount_Log'] = np.log1p(df['Amount'])
df['Time_Hour'] = df['Time'] / 3600  # Convert seconds to hours

# Interaction features
df['V1_V2'] = df['V1'] * df['V2']
df['V3_V4'] = df['V3'] * df['V4']
df['V5_V6'] = df['V5'] * df['V6']
df['V7_V8'] = df['V7'] * df['V8']
df['V9_V10'] = df['V9'] * df['V10']
df['V11_V12'] = df['V11'] * df['V12']
df['V13_V14'] = df['V13'] * df['V14']
df['V15_V16'] = df['V15'] * df['V16']
df['V17_V18'] = df['V17'] * df['V18']
df['V19_V20'] = df['V19'] * df['V20']

# Amount interactions
df['Amount_V1'] = df['Amount'] * df['V1']
df['Amount_V2'] = df['Amount'] * df['V2']
df['Amount_V3'] = df['Amount'] * df['V3']
df['Amount_V4'] = df['Amount'] * df['V4']
df['Amount_V5'] = df['Amount'] * df['V5']

# Time interactions
df['Time_V1'] = df['Time'] / 3600 * df['V1']
df['Time_V2'] = df['Time'] / 3600 * df['V2']
df['Time_V3'] = df['Time'] / 3600 * df['V3']

# Advanced statistical features
df['V_Mean'] = df[[f'V{i}' for i in range(1, 29)]].mean(axis=1)
df['V_Std'] = df[[f'V{i}' for i in range(1, 29)]].std(axis=1)
df['V_Max'] = df[[f'V{i}' for i in range(1, 29)]].max(axis=1)
df['V_Min'] = df[[f'V{i}' for i in range(1, 29)]].min(axis=1)
df['V_Range'] = df['V_Max'] - df['V_Min']
df['V_Median'] = df[[f'V{i}' for i in range(1, 29)]].median(axis=1)
df['V_Skew'] = df[[f'V{i}' for i in range(1, 29)]].skew(axis=1)
df['V_Kurt'] = df[[f'V{i}' for i in range(1, 29)]].kurtosis(axis=1)

# Prepare features and target
X = df.drop('Class', axis=1)
y = df['Class']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Scale the features
print("\nScaling features...")
scaler = RobustScaler()  # More robust to outliers
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train XGBoost model with parameters optimized for fraud detection
print("\nTraining XGBoost model...")
model = xgb.XGBClassifier(
    n_estimators=500,  # More trees
    max_depth=8,       # Deeper trees
    learning_rate=0.05,  # Slower learning rate
    subsample=0.8,
    colsample_bytree=0.8,
    scale_pos_weight=200,  # Much higher weight for positive class
    random_state=42,
    n_jobs=-1,
    min_child_weight=3,  # Require more samples per leaf
    gamma=0.2,           # Minimum loss reduction for split
    reg_alpha=0.1,       # L1 regularization
    reg_lambda=1.0       # L2 regularization
)

# Use cross-validation to find optimal threshold
print("\nFinding optimal threshold...")
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
thresholds = np.arange(0.1, 0.9, 0.05)
best_threshold = 0.5
best_f1 = 0

for threshold in thresholds:
    f1_scores = []
    for train_idx, val_idx in cv.split(X_train_scaled, y_train):
        X_cv_train, X_cv_val = X_train_scaled[train_idx], X_train_scaled[val_idx]
        y_cv_train, y_cv_val = y_train.iloc[train_idx], y_train.iloc[val_idx]
        
        model.fit(X_cv_train, y_cv_train)
        y_pred_proba = model.predict_proba(X_cv_val)[:, 1]
        y_pred = (y_pred_proba > threshold).astype(int)
        f1 = f1_score(y_cv_val, y_pred, pos_label=1)
        f1_scores.append(f1)
    
    avg_f1 = np.mean(f1_scores)
    if avg_f1 > best_f1:
        best_f1 = avg_f1
        best_threshold = threshold

print(f"Optimal threshold: {best_threshold:.2f}")

# Train final model
model.fit(
    X_train_scaled, 
    y_train,
    eval_set=[(X_test_scaled, y_test)],
    eval_metric=['auc', 'aucpr'],
    verbose=True
)

# Evaluate the model with optimal threshold
y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]
y_pred = (y_pred_proba > best_threshold).astype(int)

print("\nModel Performance:")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Calculate metrics for fraudulent transactions
fraud_precision = precision_score(y_test, y_pred, pos_label=1)
fraud_recall = recall_score(y_test, y_pred, pos_label=1)
fraud_f1 = f1_score(y_test, y_pred, pos_label=1)
fraud_auc = roc_auc_score(y_test, y_pred_proba)

print(f"\nFraud Detection Metrics:")
print(f"Precision: {fraud_precision:.3f}")
print(f"Recall: {fraud_recall:.3f}")
print(f"F1 Score: {fraud_f1:.3f}")
print(f"AUC-ROC: {fraud_auc:.3f}")

# Save the model, scaler, and threshold
print("\nSaving model, scaler, and threshold...")
joblib.dump(model, 'model.joblib')
joblib.dump(scaler, 'scaler.joblib')
joblib.dump(best_threshold, 'threshold.joblib')
print("Model, scaler, and threshold saved successfully!") 