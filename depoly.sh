# Build the project 
JEKYLL_ENV=production jekyll build



# checkout to gh-pages branch
git checkout gh-pages

cp -r ./_site/* ./ && rm -R ./_site/*


rm -rf .jekyll-cache


rm -f ./deploy.sh 

rm -rf ./_site

git add . 

git commit -m "updated website"

git push

# optimize image make max image size 1366px, 80% optimize 


git checkout master