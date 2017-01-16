import pandas as pd

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('bow', CountVectorizer(stop_words=stop_Words)),
    ('tfidf', TfidfTransformer()),
    ('classifier', MultinomialNB())
])

search_criteria = ['Print banded betina btm']
df = pd.read_csv('document-data.csv')

x_data = df['description']
y_data = df['id']

model = pipeline.fit(x_data,y_data)
prediction_prob = model.predict_proba(search_criteria)
df1 = pd.DataFrame(prediction_prob[0], columns=['probability'])
result = pd.concat([df, df1], axis=1)
result.sort_values(by='probability', ascending=False, inplace=True)
result = result['description'].head(5)
print(result.to_json(orient='values'))