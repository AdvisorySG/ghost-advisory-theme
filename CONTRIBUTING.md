# Introduction

First off, thanks for taking the time to contribute! The rest of this file describes a set of guidelines for contributing to projects under Advisory. While the bulk of contributions are made by our own developers, we welcome everyone to submit their own [Pull Requests](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) to our project repositories.

Should you have any queries on this document, please feel free to [create a new GitHub issue](https://github.com/AdvisorySG/ghost-advisory-theme/issues/new) to seek clarification.

## Licensing

Unless otherwise stated, our projects are licensed under the [MIT License](https://choosealicense.com/licenses/mit/) which is fairly permissive. Should you wish to use our code in your projects, please read [LICENSE](https://github.com/AdvisorySG/ghost-advisory-theme/blob/master/LICENSE) carefully. While attribution is not strictly necessary, it would be much appreciated if you could give us a shout-out!

Take note that the licensing of our code does not extend to the content available on [the Advisory website](https://advisory.sg/). Should you wish to reproduce our content in any part, please refer to the copyright notices on the website for more information.

## Project Setup

For details on setting up the project, please take a look at [README.md](https://github.com/AdvisorySG/ghost-advisory-theme/blob/master/README.md) which should provide all the information you may need to set up the project with the development environment of your choice.

### GitHub Flow

This project uses the [GitHub flow](https://guides.github.com/introduction/flow/) which is a lightweight and straightforward workflow that emphasises on rapid deployment. Please take a look at the linked guide (it’s only 5 minutes!) to understand how to make contributions to this repository.

In some cases, we may deviate from the GitHub flow to facilitate collaboration among developers working on large features.

### Git

We recommend that new contributors [setup the Git command line](https://help.github.com/en/github/getting-started-with-github/set-up-git) rather than making edits through the GitHub website or [GitHub Desktop](https://desktop.github.com/). This is because our workflows have been optimised to work with the Git command line and may not extend well to other interfaces. (Part of our workflows include the use of pre-commit hooks and rebase/squash which may prove to be troublesome on other interfaces.)

# New Contributors Guide

New contributors refer to both external contributors, who are not part of Advisory, as well as new web developers in Advisory who have not been added to [the Advisory organisation on GitHub](https://github.com/AdvisorySG).

Such contributors should make a [fork](https://guides.github.com/activities/forking/) of the project repository and [create a new branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) for every Pull Request to be submitted.

## Commit History

We recommend that your Pull Requests be _atomic_; they should only do one thing and be as small as possible. Wherever possible, we prefer that you submit more Pull Requests over compressing multiple commits into a single Pull Request. This helps to facilitate discussion and code review.

## Allowing Changes to Pull Request

GitHub has a nifty feature that [allows maintainers to modify your Pull Request directly](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) which can speed up the development process significantly. Wherever possible, please make sure to enable this option so that our maintainers may work on your Pull Request more efficiently.

## Pull Request Checks

[GitHub Actions](https://github.com/features/actions) will run a series of checks on your Pull Request. These checks will indicate potential issues that may arise in your Pull Request. To speed up the code review process, please fix all failing checks.

## Merge Conflicts

From the creation of the Pull Request, the codebase may drift sufficiently to cause merge conflicts in the Pull Request. It is the responsibility of the Pull Request to resolve any such merge conflicts, before a maintainer approves and merges the Pull Request.

# Existing Contributors Guide

Existing contributors refer to web developers in Advisory who have been added to [the AdvisorySG organisation on GitHub](https://github.com/AdvisorySG) and granted Triage access.

Such contributors should follow all guidelines listed in the [New Contributors Guide](#new-contributors-guide), in addition to the guidelines outlined in the rest of this guide.

## Triaging Issues

When triaging issues, please make sure to label each issue with the appropriate labels to facilitate discussion.

## Requesting Code Review for Pull Requests

When your Pull Request is ready for merge, please [link the Pull Request to the relevant issues](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue) and [request a review for your Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/requesting-a-pull-request-review) from the relevant developers and the maintainers team. To request a review from the maintainers, please use the tag **AdvisorySG/maintainers** which will automatically request review from two maintainers.

## Reviewing Pull Requests

You may sometimes be asked to review a Pull Request that may affect parts of the codebase you have recently modified. Please refer to the [Maintainers Guide](#maintainers_guide) for more information on the guidelines for code review.

# Maintainers Guide

Maintainers refer to developers who have been added to [the Maintainer team on the AdvisorySG organisation on GitHub](https://github.com/orgs/AdvisorySG/teams/maintainers). Maintainers should follow all the guidelines in the [New Contributors Guide](#new-contributors-guide) and the [Existing Contributors Guide](#existing-contributors-guide); however, they do not need to fork the repository and may create branches on the main repository directly.

## Feature Branches

While the GitHub flow dictates that Pull Requests be merged straight into the master branch, in some cases it may make more sense to follow the [Feature Branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow), where a feature branch is created for developers to collaborate on a feature without disturbing the main codebase.

In such cases, Pull Requests should be directed to the relevant feature branch rather than the master branch. Also, a Pull Request should be created from the feature branch to the master branch, so that developers may discuss the feature and track the history of changes.

## Use of Rebase

Due to the potential for disaster when used by less experienced users of Git and on public branches, [rebase should only be used on non-public branches, or branches that are only modified by the branch author](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing). Its ability to rewrite history may hinder development processes if used incorrectly.

## “Squash and Merge” or “Rebase and Merge”?

When maintainers are merging Pull Requests, GitHub may present them with the following options:

_Merge_ (disabled currently, as linear commit history has been enforced)
**Squash and Merge** (combines all commits in the Pull Request into a single squashed commit)
**Rebase and Merge** (rebases all commits in the Pull Request onto the tip of the master branch)

The decision to choose 2 or 3 is left to the discretion of the maintainer. [GitHub explains the technicalities of these two options.](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges) Maintainers are suggested to pick whichever option would lead to cleaner commit history, with all commits atomic.

In the rare case that a Pull Request’s commit history needs to be split across a few commits, a maintainer may require [an interactive rebase](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) on the branch. This should be done with great care. Maintainers are suggested to request that the author perform this rebase instead and [force push](https://git-scm.com/docs/git-push#Documentation/git-push.txt---force) to the Pull Request. In the event that changes are lost due to the rebase, [reflog](https://git-scm.com/docs/git-reflog) can then be used to restore the previous state of the branch on the PR author’s computer. This step should be done as quickly as possible, since tracking down the correct state to be restored with reflog can be very painful.
