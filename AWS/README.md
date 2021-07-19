# AWS

## Travis CI, S3, CodeDeploy, EC2를 이용한 CI/CD 구축
- 설계도
![AWS CI_CD BASIC](https://user-images.githubusercontent.com/76088639/126095868-afb9ac80-63d2-4562-8c58-49695fed6378.png)


- github push 발생 시 Travis CI로 프로젝트가 전송되고 test 및 build가 수행된다.
- Travis CI는 S3에 빌드된 파일을 전달한다.
- 그 후, CodeDeploy에게 배포를 요청하면 CodeDeploy는 S3에서 빌드된 파일을 가져온다.
- 이제 CodeDeploy는 EC2에 빌드된 파일을 배포하고, CodeDeploy의 설정을 담은 appspec.yml의 명세에 따라 배포 단계에서 실행해야 될 스크립트를 실행한다.
  - appspec.yml의 hooks로 배포 단계에서 실행할 명령어 지정
  - 주로 사용하는 배포 라이프사이클 
  - ``` AfterInstall – You can use this deployment lifecycle event for tasks such as configuring your application or changing file permissions. ```
  - ```ApplicationStart – You typically use this deployment lifecycle event to restart services that were stopped during ApplicationStop. ```
  - 예시 코드는 다음과 같다.
```yml
hooks:
  ApplicationStart:
    - location: deploy.sh
      timeout: 60
      runan: ec2-user
```

- 배포 스크립트가 수행되었다면 배포가 성공된 것을 CodeDeploy에서 확인할 수 있고, ec2 DNS와 port를 통해 웹에서도 확인해보자.

## S3 없이 Travis CI에서 바로 CodeDeploy로 빌드된 파일을 전달하면 안되나?
- CodeDeploy에는 저장 기능이 없다. 따라서 추후 재배포 시 다시 프로젝트를 빌드해야 하기 때문에 서비스가 제대로 제공되지 못할 수도 있다.
- 반면, 여기에 S3를 끼워넣어서 구축을 하면 빌드된 파일을 S3에 저장할 수 있게 되고, 재배포 시 CodeDeploy가 S3에 저장되어 있는 빌드된 파일을 바로 가져가서 배포할 수 있기 때문에 훨씬 더 빠른 서비스를 제공할 수 있게 된다! 
