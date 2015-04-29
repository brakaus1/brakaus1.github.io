for f in posts/*
do
    year=$(echo $f| awk -F '-' '{print $1}'| sed 's/posts\///g')
    month=$(echo $f| awk -F '-' '{print $2}')
    date=$(echo $f| awk -F '-' '{print $3}')
    title=$(echo $f| awk -F '-' '{print $4}' | awk -F '.' '{print $1}' | sed 's/_/ /g')
    printf '{"year": %s, "month": %s, "date": %s, "title": "%s"}' $year $month $date "$title"
    
done
