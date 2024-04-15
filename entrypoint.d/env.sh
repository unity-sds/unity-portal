#!/bin/sh
for i in $(env | grep ENV_UNITY_UI_)
do
    key=$(echo $i | cut -d '=' -f 1)
    value=$(echo $i | cut -d '=' -f 2-)
    echo $key=$value
    # sed All files
    # find $UNITY_WWW_ROOT -type f -exec sed -i "s|${key}|${value}|g" '{}' +

    # sed .js only
    find $UNITY_WWW_ROOT -type f \( -name '*.js' \) -exec sed -i "s|${key}|${value}|g" '{}' +
done
