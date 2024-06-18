import sys
import json
import psycopg2
import pandas as pd
from gensim.models import Word2Vec
from dotenv import load_dotenv
import os

load_dotenv()
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DEVELOP_DB')
db_port = os.getenv('DB_PORT')

db_config = {
    'dbname': db_name,
    'user': db_user,
    'password': db_password,
    'host': db_host,
    'port': db_port
}

word = sys.argv[1]

try:
    conn = psycopg2.connect(**db_config)
except Exception as e:
    print(json.dumps({"error": f"Error connecting to the database: {e}"}))
    sys.exit(1)

if conn:
    table_name = 'company'
    sql_query = f"SELECT * FROM {table_name};"
    try:
        df = pd.read_sql_query(sql_query, conn)
    except Exception as e:
        print(json.dumps({"error": f"Error fetching data: {e}"}))
        conn.close()
        sys.exit(1)
    conn.close()
    model = Word2Vec.load('src/scripts/word2vec_model.model')

    results = []
    
    for index, row in df.iterrows():  # 각 행에 대해 반복
        
            name = row['name']
            code = row['code']
            try:
                similarity = model.wv.similarity(word, name)
                results.append({"name": name, "code": code, "similarity": similarity})
            except Exception as e:
                results.append({"name": name, "code": code, "similarity": 0})


    results = sorted(results, key=lambda x: x['similarity'], reverse=True)
    for result in results:
        result['similarity'] = str(result['similarity'])
    print(json.dumps(results))
