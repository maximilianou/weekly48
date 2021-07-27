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
----
References:

( starting from weaveworks)

<https://trainingportal.linuxfoundation.org/learn/course/introduction-to-gitops-lfs169>

<https://trainingportal.linuxfoundation.org/learn/course/gitops-continuous-delivery-on-kubernetes-with-flux-lfs269>

---