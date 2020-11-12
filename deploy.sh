# Build the project 
JEKYLL_ENV=production jekyll build



# checkout to gh-pages branch
git checkout gh-pages


mv  -v ./_site/* ./


rm -rf .jekyll-cache


rm -rf ./deploy.sh 

rm -rf ./_site


# git commit -m "updated website"
# git push

# optimize image make max image size 1366px, 80% optimize 

