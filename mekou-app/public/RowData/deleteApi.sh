find . -name "*.json" -type f | while read -r f; do
    jq 'del(.gemini_review)' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done