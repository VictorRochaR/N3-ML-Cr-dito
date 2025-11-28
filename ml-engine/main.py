import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')

class LoanInput(BaseModel):
    person_age: float
    person_income: float
    person_emp_exp: int
    loan_amnt: float
    loan_int_rate: float
    loan_percent_income: float
    cb_person_cred_hist_length: float
    credit_score: int
    person_gender: int
    previous_loan_defaults_on_file: int
    person_education_Bachelor: int = 0
    person_education_Doctorate: int = 0
    person_education_Master: int = 0
    person_education_Associate: int = 0
    person_education_High_School: int = 0
    person_home_ownership_OWN: int = 0
    person_home_ownership_RENT: int = 0
    person_home_ownership_MORTGAGE: int = 0
    person_home_ownership_OTHER: int = 0
    loan_intent_EDUCATION: int = 0
    loan_intent_HOMEIMPROVEMENT: int = 0
    loan_intent_MEDICAL: int = 0
    loan_intent_PERSONAL: int = 0
    loan_intent_VENTURE: int = 0
    loan_intent_DEBTCONSOLIDATION: int = 0

@app.get("/")
def health_check():
    return {"status": "ML Engine is running"}

@app.post("/predict")
def predict(data: LoanInput):
    try:
        input_dict = data.dict()
        df = pd.DataFrame([input_dict])

        if hasattr(model, 'feature_names_in_'):
            model_cols = model.feature_names_in_
        else:
            raise ValueError("Model does not have feature_names_in_ attribute")

        if 'person_education_High_School' in df.columns:
            df.rename(columns={'person_education_High_School': 'person_education_High School'}, inplace=True)

        for col in model_cols:
            if col not in df.columns:
                df[col] = 0

        df_final = df[model_cols].copy()

        cols_to_scale = ['person_age', 'person_income', 'person_emp_exp', 'loan_amnt',
                         'loan_int_rate', 'loan_percent_income', 'cb_person_cred_hist_length',
                         'credit_score']

        df_final[cols_to_scale] = scaler.transform(df_final[cols_to_scale])

        prediction = model.predict(df_final)
        probability = model.predict_proba(df_final)

        result = int(prediction[0])
        prob_approval = probability[0][1]

        return {
            "approved": result == 1,
            "score": float(prob_approval),
            "risk_level": "High" if prob_approval < 0.5 else "Low"
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
