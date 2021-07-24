weekly48

---
 - Learning GitOps ( GitOps is for developers )
   - Sealed Secrets (Asymmetric cryptography, public key)
   - Structs of a GitOps Repository
     - 1 repository per application/service
     - Use a separate branch per each environment (map to a Kubernetes namespace, or cluster)
     - Push changes like image name, health checks, to staging or feature branch first.
     - Rolling out to production involves a merge. ( git merge -s . ours branchname, to skip a set of stage only changes )
     - Use protected branches to enforce code review.

 [app]
 [infra]

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




References:

( starting from weaveworks)

<https://trainingportal.linuxfoundation.org/learn/course/introduction-to-gitops-lfs169>

<https://trainingportal.linuxfoundation.org/learn/course/gitops-continuous-delivery-on-kubernetes-with-flux-lfs269>

---