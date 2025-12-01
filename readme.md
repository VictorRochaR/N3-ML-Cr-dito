# Risk Credit System (MLOps)

> Solução de análise de risco de crédito baseada em Microserviços, utilizando NestJS como Gateway e Python como Motor de Inferência.

## Sobre o Projeto

Este projeto é a produtização (Etapa N3) de um modelo de Machine Learning para classificação de risco de crédito (treinado na Etapa N2). O objetivo é operacionalizar o modelo `RandomForest` em um ambiente containerizado robusto, simulando uma arquitetura corporativa real onde a aplicação de negócio é desacoplada da lógica de ciência de dados.

## Arquitetura da Solução

O sistema utiliza **Docker Compose** para orquestrar dois serviços distintos:

1.  **App Gateway (NestJS):** API principal, responsável pela validação de dados (DTOs), segurança e comunicação com o cliente.
2.  **ML Engine (Python/FastAPI):** Microserviço isolado contendo o modelo serializado (`.pkl`) e o pipeline de pré-processamento (Scikit-learn).

```
    User[Cliente] -- POST JSON --> Nest[App Gateway (NestJS)]
    Nest -- Dados Validados --> Py[ML Engine (Python)]
    Py -- Previsão --> Nest
    Nest -- Resultado Final --> User
```

## Tech Stack

* **Infraestrutura:** Docker & Docker Compose
* **Backend:** Node.js (NestJS, Axios, Class-Validator)
* **Machine Learning:** Python 3.9 (FastAPI, Uvicorn, Scikit-learn, Pandas, Joblib)
* **Modelo:** Random Forest Classifier (Treinado na etapa N2)

## Estrutura do Projeto

```bash
risk-credit-system/
├── docker-compose.yml      # Orquestrador dos containers
├── app-gateway/            # Serviço NestJS
│   ├── src/
│   │   ├── credit/         # Módulo de Crédito
│   │   └── ...
│   └── Dockerfile
└── ml-engine/              # Serviço Python
    ├── model.pkl           # Modelo Random Forest serializado
    ├── scaler.pkl          # StandardScaler serializado
    ├── main.py             # API de Inferência
    └── Dockerfile
```

## Como Rodar

### Pré-requisitos
* Docker e Docker Compose instalados.

### Execução
Na raiz do projeto, execute:

```bash
docker compose up --build
```

O sistema subirá dois serviços:

* **Gateway:** `http://localhost:3000` (Acesso externo)
* **ML Engine:** `http://localhost:5000` (Acesso interno via rede Docker)

## Testando a API

Envie uma requisição `POST` para o Gateway (você pode usar o terminal ou Postman):

```bash
curl -X POST http://localhost:3000/credit/analyze \
-H "Content-Type: application/json" \
-d '{
  "person_age": 25,
  "person_income": 60000,
  "person_emp_exp": 3,
  "loan_amnt": 15000,
  "loan_int_rate": 10.5,
  "loan_percent_income": 0.25,
  "cb_person_cred_hist_length": 4,
  "credit_score": 650,
  "person_gender": 1,
  "previous_loan_defaults_on_file": 0,
  "loan_intent_PERSONAL": 1,
  "person_home_ownership_RENT": 1
}'
```

**Resposta Esperada:**
```json
{
  "approved": true,
  "score": 0.74,
  "risk_level": "Low"
}
```

```bash
curl -X POST http://localhost:3000/credit/analyze \
-H "Content-Type: application/json" \
-d '{
  "person_age": 25,
  "person_income": 15000,
  "person_emp_exp": 3,
  "loan_amnt": 30000,
  "loan_int_rate": 10.5,
  "loan_percent_income": 2,
  "cb_person_cred_hist_length": 4,
  "credit_score": 450,
  "person_gender": 1,
  "previous_loan_defaults_on_file": 1,
  "loan_intent_PERSONAL": 1,
  "person_home_ownership_RENT": 1
}'
```

**Resposta Esperada:**
```json
{
  "approved":false,
  "score":0.2540463964790024,
  "risk_level":"High"
}
```

## Autores


[<img src="https://avatars.githubusercontent.com/u/97479966" width="60"/>![span](https://placehold.co/10x60/FFA500/FFA500.png)![span](https://placehold.co/220x60/000000/FFFFFF/png?text=Victor%20Rocha)](https://victorrochar.github.io)

[<img src="https://avatars.githubusercontent.com/u/61090154" width="60"/>![span](https://placehold.co/10x60/FF0000/FF0000.png)![span](https://placehold.co/220x60/000000/FFFFFF/png?text=Arthur%20Hassuma)](https://arthurhassuma.github.io)

[<img src="https://avatars.githubusercontent.com/u/128716535" width="60"/>![span](https://placehold.co/10x60/800080/800080.png)![span](https://placehold.co/220x60/000000/FFFFFF/png?text=André%20Specht)](https://andreespecht.github.io)

[<img src="https://avatars.githubusercontent.com/u/135883850" width="60"/>![span](https://placehold.co/10x60/0000FF/0000FF.png)![span](https://placehold.co/220x60/000000/FFFFFF/png?text=Pablo%20Schüller)](https://pablitodogremio.github.io)

[<img src="https://avatars.githubusercontent.com/u/127154329" width="60"/>![span](https://placehold.co/10x60/FFFF00/FFFF00.png)![span](https://placehold.co/220x60/000000/FFFFFF/png?text=Nicolas%20Kasteller)](https://nicolaskasteller.github.io)

[<img src="https://avatars.githubusercontent.com/u/51389447" width="60"/>![span](https://placehold.co/10x60/808080/808080.png)![span](https://placehold.co/220x60/000000/FFFFFF/png?text=Gabriel%20Rocha)](https://gabrielforster.github.io)

> Projeto N3 - Ciência de Dados - Católica SC
