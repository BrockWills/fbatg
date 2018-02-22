![FBATG: Firebase Auth Token Generator](https://storage.googleapis.com/1cf54569e3eb88d0165/FBATG.png)

# FBATG

**Firebase Auth Token Generator.**

This is a simple little CLI for generating a firebase auth token.

## Table of Contents

  1. [Motivation](#motivation)
  2. [Installation](#installation)
  3. [Init](#init)
  4. [Generating a token](#generating-a-token)
  5. [Contributing](#contributing)

## Motivation

I was building a REST api which was using firebase for authorization, and needed to test some endpoints. The client side of the application hadn't yet been built though, so there was no way for me to (easily) obtain an auth token to hit my api with.

Thus, this little tool was born. It's pretty simple really - you configure it with your firebase details, sign in with firebase, and receive an auth token. Easy.

## Installation

You can install it locally or globally with npm. Personally, I prefer globally so that I can easily use it anywhere.

```shell
npm install -g fbatg
```

## Init

Before you can generate a token, you need to initialize the CLI with your firebase auth details.

You'll need to create a JSON file with your firebase config details in it, that looks like the following:

```json
{
  "apiKey": "<FB_API_KEY>",
  "authDomain": "<FB_PROJECT>.firebaseapp.com",
  "databaseUrl": "https://<FB_PROJECT>.firebaseio.com",
  "projectId": "<FB_PROJECT>",
  "storageBucket": "<FB_PROJECT>.appspot.com",
  "messagingSenderId": "<FB_MESSAGING_SENDER_ID>"
}
```

You can easily obtain these details from your firebase console.

Once you have this json file, you can simple return

```shell
fbatg init <path_to_file>
```

Once you get the success message from that, you're good to move on.

## Generating a token

Now that you've initialized the CLI, you can start generating tokens.

Simple run

```shell
fbatg
```

and you should get a prompt to enter and email and password for a firebase auth account.

If you successfully sign in, a firebase auth token will be printed into the console.

Much success!

## Contributing

There are still few things I'd like to do to this, and would happily accept any PRs.

**To dos:**
- Cache the user sign in so you don't have to enter your email and password every time
- Add support for other auth providers (eg. Facebook, Google etc.)

If you'd like to submit a PR, please just try to follow the style of the rest of the codebase.

##### Made by [brockwills](http://brockwills.com)
