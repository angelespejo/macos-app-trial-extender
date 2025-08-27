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
pnpm push
```

> **INFO**  This command automate git add, commit and push with commintlint

## 🛳 How do I _deploy_, _publish_ or _release_ the necessary packages?

If you want to perform any of these actions you have to first update the necessary packages with ```pnpm push``` and then ```pnpm release```.

Once the push is done, the _Github actions_ will execute it automatically.

> **INFO** This command automate git add, commit and push with commintlint

## ✅ Add test

To add a test, run the following command:

```bash
pnpm add-test
```

## ✅ Add or complete tasks

See the list of everyone in this [section](<todo/v1>)

## App icon in development

Is probably that the app icon is **not visible in development**, if you want to see it, you have to build app locally.

## Permissions in development

The request for elevated permissions in the app doesn't work in development, but everything works perfectly in production.

It's likely that files in `~/Library/Containers/com.apple.FinalCutTrial/Data/Library/Application Support/` won't be deleted in development.

---

You are ready to develop! 🐦💜


