# Dreamland
Dreamland is a meta verse company and has a concept of games, where every user can play these games and win DREAM tokens multiple times a day. A user can win upto 5 DREAM tokens on a single day.

DREAM tokens are a virtual currency and have a real monetary value. At the end of every day, the DREAM tokens won by the user are converted to USD by applying a standard multiplier of 15 cents per token.

In the backend, there are ledgers that keep track of a user's tokens and the current USD value.

The challenge is to do the following:

1. API that accepts that a user has won some amount of DREAM token at a particular time of a day (can be fractional tokens)
2. API that returns the history of tokens a user has won for the current day so far
3. API that returns the history of USD amounts a user has won till now (till the previous day)
4. API that returns the stats: sum of tokens won on the current day so far and the total value of USD a user has in his account

Assumptions:

1. You can do a basic auth for the APIs to identify the users. Scopes and permissions can be ignored (that is, all users can access all the APIs)
2. Any language of your preference (Nest JS is good for us)
3. Backend needs to have a solid double-entry ledger to track the coins and USD
4. This is a financial system, so correctness and security matter more. We are looking for well-tested code
5. Any database can be used. Preferred to use database migrations and an ORM to access them
6. Attention to details on the data types (good idea to look at BigNumber or other web3 data types that can support arithmetic on these large float numbers)
7. Edge cases validation
8. This is a global system with customers across the world. So share briefly about how you think about setting up the infra, how to share data across different regions, how to have region-specific data for issues like GDPR, how to replicate some tables out of a region to a central cluster for analytics, pros/cons, etc.
