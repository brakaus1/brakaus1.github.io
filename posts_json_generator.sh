echo "[" > posts.json
for f in posts/*
do
    printf '{"file": "%s"},\n' $f >> posts.json
done
sed -i '' '$s/.$/]/' posts.json
