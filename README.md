# Rust 程序设计语言 · 中文翻译

这是 [The Rust Programming Language](https://doc.rust-lang.org/book/) 的中文翻译静态站点。

## 文件结构

```text
.
├── index.html                  # 封面、扉页信息与目录
├── ch01-getting-started.html   # 第 1 章：开始入门
├── ch15-smart-pointers.html    # 第 15 章：智能指针
├── img/                        # 章节插图（官方 SVG）
├── style.css                   # 全站样式
├── book.js                     # 目录、阅读进度、代码复制
├── rust-logo.svg               # 官方 Rust Logo
└── favicon.svg
```

## 翻译进度

| 章节 | 标题 | 状态 |
| --- | --- | --- |
| 第 1 章 | 开始入门 | 已完成 |
| 第 2 章 | 猜数字游戏 | 待翻译 |
| 第 3 章 | 常见编程概念 | 待翻译 |
| 第 15 章 | 智能指针 | 已完成 |

## 说明

- 原文：<https://doc.rust-lang.org/book/>
- 原文作者：Steve Klabnik、Carol Nichols、Chris Krycho，以及 Rust 社区的贡献者。
- 原文采用 MIT / Apache-2.0 双许可。
- 代码、命令与终端输出保留原文；正文翻译为简体中文。
- 术语约定：`crate` 保留原文，`package` 译为“包”，`edition` 译为“版本（Edition）”。

## 本地查看

直接双击打开 `index.html`，或在项目目录运行：

```console
python -m http.server 8000
```

然后访问 <http://localhost:8000/>。
