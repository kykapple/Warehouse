## Pull request flow 🔥🔥

### 개인적으로 자주 사용하는 명령어
- ```git log --decorate --all --oneline```
- upstream의 브랜치와 origin의 브랜치, 로컬의 브랜치 커밋 로그를 쉽게 확인할 수 있어 커밋 로그를 관찰하기 좋은 것 같다.

### 첫 번째 방법
- ```upstream/J009```, ```origin/J009```, ```로컬의 J009```의 커밋 로그가 일치하는 상황에서 시작
- ```git checkout -b feature``` 기능 구현을 위한 브랜치 생성
- 개발
- ```git add *```
- ```git commit -m "commit message"```
- ```git push origin feature```
- 개발한 모든 내용을 commit하고 push 하였다면 내 원격 레포지토리에서 PR 생성
- 리뷰어분들에게 리뷰를 받은 뒤, merge 됨(merge 후, 내 원격 레포지토리의 ```feature``` 브랜치 삭제)
- 로컬에서도 ```feature``` 브랜치를 삭제한다. ```git branch -D feature```
- 최초 한번만 ```git remote add -t J009 upstream https://github.com/boostcamp/project.git``` 을 통해 ```upstream/J009``` 브랜치를 가져오도록 한다.
- 로컬에서 ```git fetch upstream J009```를 하여 ```upstream/J009```의 커밋 로그를 가져와 갱신한다.
- 현재는 ```upstream/J009```브랜치가 ```origin/J009```와 ```로컬의 J009```보다 앞서있다.
- 따라서 ```git rebase upstream/J009```를 통해 ```로컬의 J009```와 ```upstream의 J009``` 커밋 로그를 맞춰주도록 한다.
- 그 후, ```git push origin J009```를 통해 내 원격 레포지토리의 ```J009``` 브랜치에도 커밋 로그를 반영해준다.
- 이제 ```upstream/J009```, ```origin/J009```, ```로컬의 J009```의 커밋 로그가 모두 일치한다.
- 여기서부터 다시 로컬에서 ```git checkout -b feature```로 기능 구현을 위한 브랜치를 생성해서 위의 과정을 반복한다.























