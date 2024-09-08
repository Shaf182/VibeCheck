from flask import Flask, request, jsonify
from mood_analyzer import analyze_mood
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        user_text = data.get('text')
        
        if not user_text:
            return jsonify({'error': 'No text provided'}), 400
        
        mood = analyze_mood(user_text)
        resources = get_resources(mood)
        
        logging.info(f"Text: {user_text}, Mood: {mood}")
        
        return jsonify({'mood': mood, 'resources': resources})
    
    except Exception as e:
        logging.error(f"Error analyzing mood: {e}")
        return jsonify({'error': 'An error occurred while analyzing mood'}), 500

def get_resources(mood):
    resource_map = {
        'Positive': [
            'Keep up the great work! Here are some tips to maintain positivity.',
            'Check out this guide on staying productive while feeling positive.'
        ],
        'Negative': [
            'It’s okay to feel down sometimes. Consider reaching out to a friend or counselor.',
            'Here are some relaxation techniques to help you unwind.'
        ],
        'Neutral': [
            'Feeling neutral is okay. Try doing something fun to uplift your mood!',
            'Consider taking a break and trying a new hobby or activity.'
        ]
    }
    
    return resource_map.get(mood, [])

if __name__ == '__main__':
    app.run(debug=True)
