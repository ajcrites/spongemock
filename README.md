# Spongemock
This library provides resources for working with text to
transform it into [Spongebob mocking meme text](http://knowyourmeme.com/memes/mocking-spongebob).

![sPoNgEBoB](https://raw.githubusercontent.com/ajcrites/spongemock/master/sPoNgEBoB.jpg)

## Algorithm
At first, I thought that the letters started with lowercase
and just alternated.

> aT fIrSt, I tHoUgHt...

However, after reviewing quite a few uses of the meme, I
found that there is an element of randomness to it.

This library will inspect the text and transform letters
to uppercase or lowercase according to the following
algorithm:

1. If a non-ASCII or non-letter is encountered, it is ignored
2. The first letter encountered has a 50% chance of being
 upper or lowercase
3. If the next letter encountered is a different case, it has
 a 15% chance of being transformed (85% chance of staying a
 different case). This means that `an` or `AN` arrangements
 should appear infrequently, but occassionally. `An` or `aN`
 arrangements will appear often.
 * If the next letter encountered is the same case, it thus
 has a 85% chance of being transformed.
4. If a letter is the same case as _two_ previous letters,
 it has a 98% chance of being transformed. Arrangements of
 three of the same case as in `ana` or `ANA` are rare, but
 I have seen them occur in these memes.

## Usage

    import { spongeMock } from 'spongeMock';
    spongeMock("This is a test string.");
    // 'tHiS iS a TeSt StRiNg.'

Simple as that.

## CLI

You can `yarn global add spongemock` to add a cli tool that
allows you to spongemockify strings and files. You can give
it a list of files to mock or else it will read from stdin.

    spongemock README.md
    git log | spongemock
    spongemock -e "works on strings with -e argument"
