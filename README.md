# CMPE 272 - Team 22

## Idea 1 : Grocery Items Recommendation Systems and Basket Data Analysis

### Groceries are a staple and repetitive part of our daily life. We often tend to gravitate towards similar grocery products/brands as most of our friends/family and with the help of  user-user collaborative filtering, one can filter out the items that a user might like based on the reaction of similar users. 
### We can also use *Apriori Algorithm* for the below insights for the below problems,if X & Y are frequently bought together:

#### * Both X and Y can be placed on the same shelf, so that buyers of one item would be prompted to buy the other.

#### * Promotional discounts could be applied to just one out of the two items.

#### * Advertisements on X could be targeted at buyers who purchase Y.

#### * X and Y could be combined into a new product, such as having Y in flavors of X.


#### Dataset : https://www.kaggle.com/c/instacart-market-basket-analysis/data


## Idea 2 : Using US Facts.org Immigration data to predict H1-B Visa approvals/rejections 

### Introduction -  H-1B visas are a category of employment-based, non-immigrant visas for temporary foreign workers in the United States. For a foreign national to apply for H1-B visa, a US employer must offer them a job and submit a petition for a H-1B visa to the US immigration department. A prediction on H1B Visa approval/rejection could prevent the impact it can have on an employee or employer.

### Approach -  We propose to build a dashboard to enter user data and use those features to plug into our model, trained on Immigration data from USFacts.org to predict whether their H1-B visa would get approved/rejected and also suggest possible key metrics for approval/rejection for future applicants.

### Dataset - https://usafacts.org/issues/immigration/



## Idea 3 : Sentiment Analysis of r/WallStreetBets sub reddit posts and correlation with $GME stock prices movements

### Introduction - Recently, a few thousand Redditors tried to take on the Wall Street stalwarts by try to buy and hold GME stock options against a big short position held by major conglomerates on Wall Street. A sentiment analysis on the sub reddit posts data could help investigate the correlation between GME stock price vs. the growing subp-reddit user opinions to figure out the complete story.
### Approach - We will be extracting the data from reddit using praw. PRAW is a Python wrapper for the Reddit API, which enables you to pull data from subreddits. We will be investigating the correlation between GME stock price and growing sub-reddit user opinion. From than we can predict the stock price. A dashboard will be created to show the correlation analysis and complete story.
### Dataset - https://www.kaggle.com/gpreda/reddit-wallstreetsbets-posts?select=reddit_wsb.csv


