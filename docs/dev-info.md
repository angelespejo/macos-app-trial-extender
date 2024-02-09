# Information for the developer 👨‍💻

## 🗝 Requeriments

There are some requirements that must be met before you start developing.

1. 🗄️ **Node installation**: Download and install Node.js from the official website.
2. 👷 **PNPM installation**: Follow the installation instructions for PNPM.

> **INFO** before installation check which version you have to install in the package.json of the project

## 🔑 Project installation

```bash
pnpm i
```

## 🔧 Package development

```bash
pnpm dev
```

## 📦 Package build

```bash
pnpm build
```

## 📊 Update packages version

```bash
pnpm release
```

> **INFO**  This command automatically updates the versions of the packages that are selected at the prompt

## 🚢 Push in **MAIN** branch

```bash
pnpm push-main
```

> **INFO**  This command automate git add, commit and push with commintlint

## 🛳 How do I _deploy_, _publish_ or _release_ the necessary packages?

If you want to perform any of these actions you have to first update the necessary packages with ```pnpm update-version``` and then push with ```pnpm push-main```.

Once the push is done, the _Github actions_ will execute it automatically.

> **INFO** This command automate git add, commit and push with commintlint

## ✅ Add or complete tasks

All tasks including project ideas can be found by running the following command:

```bash
pnpm todo
```

you can also see the list of everyone in this [section](<http://localhost:5173/todo/v1>)

---

You are ready to develop! 🐦💜
