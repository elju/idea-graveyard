#!/bin/bash
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
i=1
for file in ./backups/*.jpg; do
    cp -T ${file} ./artwork_${i}.jpg
    i=$(expr ${i} + 1)
done
IFS=$SAVEIFS
