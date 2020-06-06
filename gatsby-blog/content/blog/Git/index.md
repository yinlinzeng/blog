---

title: git基本指令

date: "2020-06-06 19:22:35"

description: "git基本指令"

tags: ["coding","git"]

---

地址：https://github.com/yinlinzeng/Web.git

1. 先初始化本地目录	
2. 添加文件到仓库
3. 把文件提交到仓库，并把版本号定为“提交的信息”
4. 创建新分支newbranch
5. 切换到新分支
6. 把文件上传到github上的newbranch

`git init`：初始化本地目录

`git branch`：查看分支

`git add .`：向仓库通知要添加什么文件

`git commit -m '<name>'`：向仓库添加文件

`git branch `：查看分支情况

`git checkout <name>`：切换分支

`git checkout -b <name>`：创建并切换分支

`git branch -d <name>`：删除分支

`git merge <name>`：合并分支

`git push <name>`：提交文件

`git reset --hard commit_id`：切换到历史版本

`git log`：查看提交历史

`git reflog`：查看命令历史

`git checkout -- file`：丢弃工作区的文件的修改

`git reset HEAD <file>`：把暂存区的文件移入工作区

`git rm `：删除工作区的文件

`git status`：查看状态