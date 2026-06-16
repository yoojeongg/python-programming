import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# CSV 불러오기
BASE_DIR = os.path.join(os.path.dirname(__file__), "data")

df = pd.read_csv(
    os.path.join(BASE_DIR, "user_sample_dataset_500_2.csv"),
    encoding="utf-8-sig"
)
df.head(5)

# 라벨인코딩
encoders = {}
for col in df.columns:
    if df[col].dtype == "object":
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        encoders[col] = le

# X, y 분리
X = df.drop("만족", axis=1)
y = df["만족"]

# 학습용 / 테스트용 분리
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.3,
    random_state=42,
    stratify=y
)

# Random Forest 생성
rf = RandomForestClassifier(
    n_estimators=300,
    max_depth=10,
    random_state=42
)

# 학습
rf.fit(X_train, y_train)

# 예측
y_pred = rf.predict(X_test)

# 정확도
accuracy = accuracy_score(y_test, y_pred)
print("정확도:", round(accuracy * 100, 2), "%")
print("\n분류 리포트")
print(classification_report(y_test, y_pred))

# 변수중요도
importance = pd.DataFrame({
    "변수": X.columns,
    "중요도": rf.feature_importances_
})
importance = importance.sort_values(
    by="중요도",
    ascending=False
)
print(importance)

import joblib
joblib.dump(
    rf,
    "user_sample_dataset_500_2.pkl"
)