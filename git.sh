# /bin/bash

cmmsg=$1;

echo $cmmsg

git st && git add . && git cm "$cmmsg" && git push origin main