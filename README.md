weekly48

----
 - Learning GitOps ( GitOps is for developers )
   - Sealed Secrets (Asymmetric cryptography, public key)
   - Structs of a GitOps Repository
     - 1 repository per application/service
     - Use a separate branch per each environment (map to a Kubernetes namespace, or cluster)
     - Push changes like image name, health checks, to staging or feature branch first.
     - Rolling out to production involves a merge. ( git merge -s . ours branchname, to skip a set of stage only changes )
     - Use protected branches to enforce code review.


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

#### GitOps

  - IaC - Ops
  - Git - Dev, Pull Request, Code Review, Branching Model
  - CI/CD - Continuous, Automation
  - Convergent Platforms | Kubernetes - api, extendible, convergent

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

#### Principles and Practice of GitOps

1. Write 100% Declarative Configuration 
  - yaml  |Helm |Kustomize
2. Store Desired State in Git
3. Apply Approved Changes Automatically 
   - |Pull Request |Code Review > feature > main > release 
4. Check Correct State with Software Agent 
   - |Reconciliate Pull/Push |Check (Notify|Correct)
 
#### Reconciliation Models - Pull vs Push
 - Git Repo
 - Container Regitstry
 - CD Process - |Reconciler
 - Kubernetes Cluster

Pull Model - watch and apply ( agent per cluster, flexible, secure )

Push Model - hook and apply ( one agent, many cluster )

- Tools of the Trade
  1. FluxCD | ArgoCD | JenkinsX
  2. CI + CD |JenkinsX, just CD |FluxCD |ArgoCD 

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
References:

( starting from weaveworks)

<https://trainingportal.linuxfoundation.org/learn/course/introduction-to-gitops-lfs169>

<https://trainingportal.linuxfoundation.org/learn/course/gitops-continuous-delivery-on-kubernetes-with-flux-lfs269>

---