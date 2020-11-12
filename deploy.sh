# Build the project 
JEKYLL_ENV=production jekyll build

cd ./_site/
# make it zip 
zip -r dist.zip ./


# move to the desktop 
mv ./dist.zip /Users/kousheralam/Desktop


cd ../


# checkout to gh-pages branch
git checkout -b gh-pages


# move zip from desktop to current dir
mv /Users/kousheralam/Desktop/dist.zip ./


# extract it 

# remove the zip 

# optimize image make max image size 1366px, 80% optimize 

# add go git

# commit - updated website

# push 
