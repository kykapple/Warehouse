# AWS

## Travis CI, S3, CodeDeploy, EC2를 이용한 CI/CD 구축
- 설계도
![undefined](https://user-images.githubusercontent.com/76088639/125245779-edf09d00-e32b-11eb-94aa-364867b892c5.png)

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
