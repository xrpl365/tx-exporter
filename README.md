# TX-EXPORTER

Welcome to the repository for TX Exporter, an xApp for XUMM.

This project is open source and we encourage collaboration and engagement on fixes and future features.

If you have general questions or feature requests please post under the discussions section.

Bugs should be reported under issues, with as much detail as possible.

# Recent Updates

19th August 2022
Release 1.07

- Added support for destination and source tags in export

23rd February 2022
Release 1.06

- Includes bug fixes for incorrect offer values
- Improvements to offer transactions, displaying amounts exchanged
- Fee separation option on all TX, including XRP payments and offers
- Improvements to value rounding and decimal place display
- Addition of sender and receiver addresses for payments

# Frequently Asked Questions

Please check these FAQs before raising support queries.
If your question is not listed here, please start a discussion.

## Why am I seeing weird values in the amount field, eg: 1e-81

This is scientific notation, it is not an error.
Scientific notation is a way of expressing numbers that are too large or too small to be conveniently written in decimal form.
You can convert scientific notation to a real number if you need; here is a tool you can use: https://www.calculator.net/scientific-notation-calculator.html
Note: our tool does not support conversion by design because most spreadsheets auto convert the numbers back to scientific notation rendering our conversion pointless.

## Some of my recent transactions are missing

This is likely down to you not having the most recent copy of your transactions within the App.
Transactions are cached so that the XRPL is not continually spammed with full history fetch requests; this also means the App will load significantly faster on subsequent loads.
You can of course force-reload your history; go to the settings page and click the Refresh Ledger button.

## How can I show transaction fees as a separate transaction ?

There is a toggle you can set for this in the settings.

## How can I export additional data ?

On the export page there is a display of fields that will be exported; use the pen icon to edit this list and export more data.

## I get errors when I build, nagging about font awesome ?

The project uses a pro license for fontawesome, so either get a paid version or remove the paid icons from package.json and update the UI to a different icon library.
