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



----
References:

( starting from weaveworks)

<https://trainingportal.linuxfoundation.org/learn/course/introduction-to-gitops-lfs169>

<https://trainingportal.linuxfoundation.org/learn/course/gitops-continuous-delivery-on-kubernetes-with-flux-lfs269>

---