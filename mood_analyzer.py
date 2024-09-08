from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

nltk.download('vader_lexicon')

def analyze_mood(text):
    sia = SentimentIntensityAnalyzer()
    sentiment = sia.polarity_scores(text)
    compound = sentiment['compound']
    
    if compound >= 0.05:
        return 'Positive'
    elif compound <= -0.05:
        return 'Negative'
    else:
        return 'Neutral'
