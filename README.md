weekly48

----

[![Introduction to GitOps Certificate, Linux Fundation](https://raw.githubusercontent.com/maximilianou/weekly48/master/share/maximiliano-usich-introduction-to-gitops-lfs169-certificate.png)](https://raw.githubusercontent.com/maximilianou/weekly48/master/share/maximiliano-usich-introduction-to-gitops-lfs169-certificate.png)



----
 - Learning GitOps ( GitOps is for developers )
   - Sealed Secrets (Asymmetric cryptography, public key)
   - Structs of a GitOps Repository
     - 1 repository per application/service
     - Use a separate branch per each environment (map to a Kubernetes namespace, or cluster)
     - Push changes like image name, health checks, to staging or feature branch first.
     - Rolling out to production involves a merge. ( git merge -s . ours branchname, to skip a set of stage only changes )
     - Use protected branches to enforce code review.


----
 - What is in your GitOps Repository
   - Kubernets Manifest
   - Application Configuration ( ConfigMaps )
   - Provisioning Scripts ( Terraform )
   - Dashboards ( pipelines )
   - Alerts
   - Playbooks ( Ansible )
   - Application Checklists ( assesment in a yaml to check automatically )
   - Recording Rules ( prometheus rules )
   - Sealed Secrets 

 [app]

 [infra]

 [fleet]

----
#### GitOps

  - IaC - Ops
  - Git - Dev, Pull Request, Code Review, Branching Model
  - CI/CD - Continuous, Automation
  - Convergent Platforms | Kubernetes - api, extendible, convergent

----
#### GitOps commont Use Cases

  1. Continuous Delivery of Application Configurations
  2. Apply Release Strategies - |Blue Green |Rolling Update |Canary
  3. Infrastructure Rollouts to Kubenretes - |Ingress Controller |Namespaces |RBAC Policies |Network Policies |CRDs
  4. Disaster Recovery
  5. Sync Secrets |Vault |k8s
  6. Drift Detection - |Notify |Reconcile
  7. Deploy to Multiple Kubernetes Cluster
  8. Securely Handoff Deployments to Devs - |No Cluster Access to Devs |Multi Tenancy |Separation of Concernts
  9. Auto Update Kubernetes YAMLs on new Image in Retistry

----
#### Principles and Practice of GitOps

1. Write 100% Declarative Configuration 
  - yaml  |Helm |Kustomize
2. Store Desired State in Git
3. Apply Approved Changes Automatically 
   - |Pull Request |Code Review > feature > main > release 
4. Check Correct State with Software Agent 
   - |Reconciliate Pull/Push |Check (Notify|Correct)
 
----
#### Reconciliation Models - Pull vs Push
 - Git Repo
 - Container Regitstry
 - CD Process - |Reconciler
 - Kubernetes Cluster

Pull Model - watch and apply ( agent per cluster, flexible, secure )

Push Model - hook and apply ( one agent, many cluster )

----
- Tools of the Trade
  - FluxCD | ArgoCD | JenkinsX
    1. CI + CD |JenkinsX 
    2. just CD |FluxCD |ArgoCD 

----
Key Benefits of GitOps
  - Deploy Faster
  - Developer Centric 
  - Quick and Easy Recovery - (MTTR Mean Time To Recovery)
  - Secure - Separation of Concerns CI vs CD
  - Autidatibility - Audit log outside of the Cluster
  - Self Documented Code
  - Rollout with PR | Rollback with a Revert
  - Code is Reviewed
  - Observability ( Single Source of Truth )
  - Increase Stability | Reliability


----
1. App, development
2. CI, test ok
3. Image, build
4. Registry, push
5. Kubernetes Cluster, running
6. new Resigtry, yaml app, publish
7. Kubernetes deploy

----
- Flux V2 ( Kubernetes Controller Model Microservices )
- Controllers + CRD ( Custom Resources Definitions )
  - Source Controller           |Git Repository |Helm Repository |Helm Charts |Bucket
  - Kustomize Controller        |Kustomize ( Main yaml, Kustomize Overlays )
  - Helm Controller             |Helm Release 
  - Notification Controller     |Provider |Receiver |Alert
  - Image Automation Controller |Image Repository |Image Policy |Image Update Automation 

----
- Progressive Delivery = Flux + Flagger

Flagger + Ingress Controller + nginx
                             + traefik
        + Service Mesh + istio
                       + linkerd

Implements -> Release Strategies  - Blue/Green
                                  - Prograssive Canary
                                  - A/B Testing 


----
https://github.com/lfs269/

----

- Kubernetes
  - Control-Plane
    - API-Server
    - Scheduler
    - Controller Manager
          |Workload     |Controller
      app |Stateless HA |Deployment
      log |Agent        |Daemon Sets
      db  |Statefull    |Statefull Sets
          |Jobs         |Jobs
          |Cronjobs     |Cron
    - Etcd
  - Node
    - Kubelet
    - Runtime
    - Kube-proxy

  - namespaces ( permissions, quota )
  - Pods
  - ReplicaSets
  - Deployments
  - Services

----
- vote app - |Deployment |Service
- redis - |Deployment |Service
- worker app - |Deployment
- db - |Deployment |Service
- result app - |Deployment |Service

----
1. Havnig the kubernetes cluster running
2. Namespace ( Multi-Tenancy Features )
  - Logical separation and views
  - RBAC - Users and Roles
  - Network Policies
  - Quotas - Resource | Objects
  ( ProjectA, ProjectB, dev, stage, prod )
3. Context
  - kubectl config get-contexts [ (ns:dev,usr:dev-user,cluster:A), (ns:stage,usr:dev-user,cluster:B), (ns:prod, usr:dev-user, cluster:C] context switch
4. kubectl create deployment app1 --image=myregistry/app1:v4
   4.1 $ watch kubectl get all
   4.2 pod/app1-382f2c24-asdf
   4.3 deployment.apps/app1
   4.4 replicaset.apps/app1-2352fc32 
   4.5 $ kubectl scale deploy app1 --replicas=4
   4.6 $ kubectl delete pod app1-43242fc-qewr ( kill a pod will regenerate other pod )
5. Exposing a service
6. Version
  - kubectl set image deployment app1 app1=myregistry/app1:v5
  - kubectl rollout status deploy/app1 # RollOut or Zero downtime deployment
7. Service Discovery
  - kubectl create deployment redis --image=redis:alpine
  - kubectl create service clusterip redis --tcp=6379
8. yaml ( AKMS - apiVersion, kind, metadata, spec )
  - kubectl create deployment xyz --image=xyz/abc:v1 --replicas=4 --dry-run=client -o yaml
  - kubectl create service nodeport xyz --tcp=80 --node-port=30000 --dry-run=client -o yaml

----

```
:~/projects/weekly48$ kubectl create namespace instavote
namespace/instavote created
:~/projects/weekly48$ kubectl get ns
NAME              STATUS   AGE
default           Active   29m
kube-system       Active   29m
kube-public       Active   29m
kube-node-lease   Active   29m
instavote         Active   21s
:~/projects/weekly48$ kubectl config get-contexts
CURRENT   NAME      CLUSTER   AUTHINFO        NAMESPACE
*         k3d-dev   k3d-dev   admin@k3d-dev   
:~/projects/weekly48$ kubectl config set-context --current --namespace=instavote
Context "k3d-dev" modified.
:~/projects/weekly48$ kubectl config get-contexts
CURRENT   NAME      CLUSTER   AUTHINFO        NAMESPACE
*         k3d-dev   k3d-dev   admin@k3d-dev   instavote
:~/projects/weekly48$ kubectl create deployment vote --image=schoolofdevops/vote:v4
deployment.apps/vote created
:~/projects/weekly48$ kubectl get pods
NAME                   READY   STATUS    RESTARTS   AGE
vote-f5c7c9f8c-xnzqn   1/1     Running   0          25s
:~/projects/weekly48$ kubectl get deploy
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
vote   1/1     1            1           54s
:~/projects/weekly48$ kubectl get all
NAME                       READY   STATUS    RESTARTS   AGE
pod/vote-f5c7c9f8c-xnzqn   1/1     Running   0          64s
NAME                   READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/vote   1/1     1            1           65s
NAME                             DESIRED   CURRENT   READY   AGE
replicaset.apps/vote-f5c7c9f8c   1         1         1       65s

```

DRAFT
```
personal access token - github
export GITHUB_TOKEN=xxx
export GITHUB_USER=xxx
kubectl get nodes
kubectl config get-contexts
kubectl get pods --all-namespaces
kubectl get crds
flux
flux bootstrap github -h
flux bootstrap github --owner=$GITHUB_USER \
  --repository=flux-infra \
  --branch=main \
  --path=./cluster/dev
  --personal \
  --log-level=debug \
  --network-policy=false \
  --components=source-controller,kustomize-controller

flux check
kubectl get crds
kubectl get pods -n flux-system
kubectl get all -n flux-system
kubectl get clusterroles,clusterrolebindings,serviceaccounts -n flux-system -l "app.kubernetes.io/instance=flux-system"

```
- source-constoller
- kustomize-controlle ( deployment contoller )

https://fluxcd.io/

- source
```
flux create source git -h  
```
- spec
  - url - repo |ssh |https
  - interval |s |m |h
  - branch
  - secretRef - credentials
  - verify - GPG 
  - ignore 
  - timeout
  - ref
  - suspend

```
flux get
flux get sources git
flux create source git -h
flux create source git instavote --url https://github.com/../instavote.git --branch main 
flux get sources git

```
- kustomize
  - source1, source2
  - reconcile - k8s cluster
  - kustomize |Plain Yaml |Overlay
  - validate - against k8s api
  - notify - notification-controller
  - Garbage Collection ( --prune )
  - sequencing - ( --depends-on )
  - helths checks
  - RBAC - multi tenancy security 

- CRD
  - kind: Kustomization
    - sourceRef - gitrepository
    - path
    - interval
    - prune
    - dependsOn
    - targetNamespace
    - helthchecks

```
flux get kustomizations
flux get source git
kubectl get ns
kubectl create ns instavote
kubectl get ns
flux create kustomization -h
flux create kustomization vote-dev --source=instavote --path="./deploy/vote" --prune=true --interval=1m --target-namespace=instavote
flux get kustomizations
kubectl get all -n instavote --show-labels
```

- manual reconciele
```
flux reconcile kustomization vote-dev
flux reconcile source git instavote
```

- semver controller
```
git clone https://github.com/.../flux-infra
cd flux-infra/cluster/dev
flux export source git instavote
flux export source git instavote >> instavote-gitrepository.yaml

flux export kustomization vote-dev 
flux export kustomization vote-dev >> vote-dev-kustomization.yaml
git add
git commit
git push origin main

```
- healthcheck
```
flux create kustomization vote-dev --source=instavote  --path="./deploy/vote" --prune=true --interval=1m --target-namespace=instavote --health-check="Deployment/vote.instavote" --export > vote-dev-kustomization.yaml
flux get kustomizations
```

- Depencency - Sequencing

##### Kustomizing Kubernetes Environments

- Overlay ( kustomize tool )
  - vote
    - base
      - deployment.yaml
      - service.yaml
      - kustomization.yaml - kind: kustomization, resources: - deployment.yaml, -service.yaml
    - dev
      - deployment.yaml
      - kustomization.yaml - kind: kustomization, resources: ..
    - staging
      - deployment.yaml
      - kustomization.yaml - kind: kustomization, resources: ../base, - deployment.yaml

<https://kustomize.io/>

```
deploy/vote/base$ kustomize create --autodetect
cat kustomization.yaml
```

```
flux get kustomizations --context=dev
flux logs --tail 20 --follow --context=dev
cd flux-infra/cluster/dev

vi vote-dev-kustomization.yaml
  path: ./deploy/vote/dev

git add
git commit
git push

watch flux get kustomizations --context=dev
```

```
kustomize build
```

- helm
```
helm install db lfs269/posgres --set settings.authMethod=trust,service.name=db --namespace=instavote
kubectl get all -n instavote
```

- notification
```
kubectl create secret generic slack-url --from-literal=address=https://hooks.slack.com/services/TKSD253/ASDFAS -n flux-system 
kubectl get secret -n flux-system
```

```
flux get alert-providers
flux check
kubectl get crds
flux create alert-provider -h
flux create alert-provider slack --type slack --channel general --address http://hooks.slack.com/services/your/slack/webhook --secret-ref webhook-url --export
```

```
flux create alert -h
flux create alert slack-notif --event-source=Kustomizetion/* --event-source=GitRepository/* --event-source=HelmRelease/* --provider-ref=slack --event-severity=info --export
```
- Notification Alert to GitRepository
```
 - Personal Token with write acces on github
kubectl create secret -n flux-system generic github-token --from-literal=token=AAAA

kubectl describe secret -n flux-system github-token

flux create alert-provider github-instavote --type=github --address=https://github.com/aaaaa/instavote --secret-ref=github-token --export

flux create alert vote-staging --provider-ref=github-instavote --event-severity info --event-source Kustomization/vote-staging --export

flux create alert redis-staging --provider-ref=github-instavote --event-severity info --event-source Kustomization/redis-staging --export

flux create alert worker-staging --provider-ref=github-instavote --event-severity info --event-source Kustomization/worder-staging --export

flux get alerts
```

- push model over notification
```
flux-infra/clusters/staging/flux-system$ cat > expose-webhook-receiver.yaml
apiVersion: v1
kind: Service
metadata:
  name: webhook-receiver
  namespace: flux-system
spec:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: http-webhook
    nodePort: 31234
  selector:
    app: notification-controller
  type: NodePort


flux-infra/clusters/staging/flux-system/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- gotk-components.yaml
- gotk-slack.yaml

patchesStrategicMerge:
- expose-webhook-receiver.yaml


kubectl get svc -n flux-system
flux reconcile kustomization flux-system
flux reconcile source git flux-system
```

```
WEBHOOK_TOKEN=`date | md5sum | cut -d ' -f1' `; # Random String
echo $WEBHOOK_TOKEN

kubectl -n flux-system create secret generic webhook-token --from-literal=token=$WEBHOOK_TOKEN
kubectl -n flux-system describe secret webhook-token

flux get receivers
flux create receiver -h
flux create receiver instavote --type github --event ping --event push --secret-ref webhook-token --resource GitRepository/instavote --export
flux get receivers

```

- monitoring p & g

```
flux get source git

flux create kustomization monitoring --interval=1h --prune=true --source=monitoring --path="./manifests/monitoring" --health-check="Deployment/prometheus.flux-system" --health-check="Deployment/grafana.flux-system"

flux get kustomizations

kubectl get svc,deply -n flux-system

```


#### CI with Tekton ( kubernetes native )

- kubernetes + CI ( Tekton )
```
controllers
  tekton-pipelines
    runs ci-pipelines
crds
  pipelines
    pipeline runs
  tasks
    task runs
  conditions
  cluster tasks


3 components of tekton
  tekton pipelines
  tekton triggers ( events, git push )
  tekton dashboard ( gui, to lunch pipelines)

- tekton

pipeline:
  tasks:
    - build:
      steps:
        - clone-repo
        - compile
    - test:
      steps:
        - run ut
        - push reports
    - img-build:
      steps:
        - build image
        - push image to reg
```

```
kubectl version -o yaml
kubectl get storageclasses
which tkn
https://tekton.dev
kubectl apply --filename https://storage.googleapis.com/tekton-release/pipeline/latest/releas..
kubectl get ns
kubectl get crds

install tkn from the page tekton.dev instructions

tkn p list
tkn t list

https://github.com/lfs269/tekton-ci
https://github.com/tektoncd/catalog/task/git-clone
tekton hub

watch 'tkn p list; tkn pr list; tkn t list; tkn tr list; kubectl get pods'
kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/git-clone/0.3/git-clone.yaml
kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/kaniko/0.3/kanilo.yaml

```
- pipeline runs
```
tkn pr logs vote-ci -f
docker login
cat ~/.docker/config.json
cat ~/.docker/config.json | base64 | tr -d '\n'

- file: dockerhub-creds-secret.yaml
apiVersion: v1
kind: Secret
metadata: 
  name: dockerhub-creds
data:
  config.json: <base64-encoded-json-here>

kubectl apply -f dockerhub-creds-secret.yaml 

```

- CI CD ( tekton - flux )
```
flux create image repository -h
flux create imgae repository vote --image=dopsdemo/vote --interval=1m
flux create image policy -h # ( what image to take from the image repository )

flux create secret -h
flux create secret git -h
flux create secret git github-instavote --url=https://github.com/aaaaa/instavote --username=$GITHUB_USER --password=$GITHUB_TOKEN
flux get secrets
```

```
github.com/fluxcd/flux-multi-tenancy
```

----
References:

( starting from weaveworks)

<https://trainingportal.linuxfoundation.org/learn/course/introduction-to-gitops-lfs169>

<https://trainingportal.linuxfoundation.org/learn/course/gitops-continuous-delivery-on-kubernetes-with-flux-lfs269>

---