@Library(['common-utils']) _
 
properties([
    buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '7', daysToKeepStr: '', numToKeepStr: '7')),
    disableConcurrentBuilds(),
    disableResume()
]);
 
 
// GLOBAL VARIABLES
class GlobalVars {
    static String productName    = "qcms"
    static String serviceAccount = "lm-sa-${productName}"
    static String appName        = "lmru-qcms-frontend"
}
// JOB VARIABLES PER ENVIRONMENT
def getEnvironmentParameters(name) {
    switch (name) {
        case 'prod':
            jobVars = [
                k8sCluster             : "shared",
                k8sNamespace           : "${GlobalVars.productName}-prod",
                dockerImageName        : GlobalVars.appName,
                dockerImageTagsList    : [env.TAG_NAME],
                dockerImagePromoteFlag : true,
                vaultSecretPath        : "prod/FE/datasource",
                vaultApprole           : "approle-prod-ro"
            ]
            break
        case 'preprod':
            jobVars = [
                k8sCluster             : "shared-stage",
                k8sNamespace           : "${GlobalVars.productName}-preprod",
                dockerImageName        : GlobalVars.appName,
                dockerImageTagsList    : [env.GIT_COMMIT],
                dockerImagePromoteFlag : false,
                vaultSecretPath        : "preprod/FE/datasource",
                vaultApprole           : "approle-preprod-ro"
            ]
            break
        case 'test':
            jobVars = [
                k8sCluster             : "shared-stage",
                k8sNamespace           : "${GlobalVars.productName}-test",
                dockerImageName        : GlobalVars.appName,
                dockerImageTagsList    : [BRANCH_NAME, env.GIT_COMMIT],
                dockerImagePromoteFlag : false,
                vaultSecretPath        : "test/FE/datasource",
                vaultApprole           : "approle-test-ro"
            ]
            break
        case 'develop':
            jobVars = [
                k8sCluster             : "shared-stage",
                k8sNamespace           : "${GlobalVars.productName}-dev",
                dockerImageName        : GlobalVars.appName,
                dockerImageTagsList    : [BRANCH_NAME, env.GIT_COMMIT],
                dockerImagePromoteFlag : false,
                // vaultSecretPath        : "develop/front",
                vaultSecretPath        : "develop/FE/datasource",
                vaultApprole           : "approle-develop-ro",
                deployment_env         : "dev"
            ]
            break
    }
    println "USING '${name}' ENVIRONMENT: ${jobVars}"
    return jobVars
}
 
 
// PIPELINE START
node ("lmru-dockerhost") {
    basePipeline(
        onStart: {
            checkout()
        },
        mainBranch: "master",
 
    // DEPLOY FROM RELEASE TAG IN MASTER BRANCH
        onTag: {
            if (gitUtils.isCurrentCommitFromBranch("master")) {
                jobVars = getEnvironmentParameters("prod")
                getSecretsFromVault()
                buildAndPush()
                deployToK8S()
            }
        },
 
    // DEPLOY FROM MASTER BRANCH (WITHOUT TAG)
        onMainBranch: {
            jobVars = getEnvironmentParameters("preprod")
            getSecretsFromVault()
            buildAndPush()
            deployToK8S()
        },
 
    // DEPLOY FROM OTHER BRANCHES
        onBranchCommit: {
            if (env.BRANCH_NAME == "test") {
                jobVars = getEnvironmentParameters("test")
                getSecretsFromVault()
                buildAndPush()
                deployToK8S()
            }
            if (env.BRANCH_NAME == "develop") {
                jobVars = getEnvironmentParameters("develop")
                getSecretsFromVault()
                buildAndPush()
                deployToK8S()
            }

        },
 
    // PULL REQUEST ACTIONS
        onPullRequest: {
 
        },
 
    // END OF PIPELINE
        onFinish: {
 
        },
 
        doFinally     : {
            echo 'Pipeline completed'
        }
 
    )
 
}
 
// Pull git repository ans set some useful variables
void checkout() {
    stage('Checkout') {
        cleanWs()
        checkout scm
        env.GIT_REPO   = gitUtils.getGitRepoUrl()
        env.GIT_COMMIT = gitUtils.getCommitShaShort()
        env.GIT_DATE   = gitUtils.getLastCommitDate()
        BRANCH_NAME    = env.BRANCH_NAME.replaceAll("/", "-")
    }
}
 
// Get secrets from Vault to environment variables
void getSecretsFromVault() {
    stage('Get secrets from Vault') {
        vaultUtils.secretsToEnv(
            "namespace": GlobalVars.productName,
            "vaultPath": jobVars.vaultSecretPath,
            "appRoleCredential": jobVars.vaultApprole
        )
    }
}
 
// Build docker image and push to Artifactory registry
void buildAndPush() {
    stage('Docker build and push') {
        dockerUtils.buildImage([
            projectName: GlobalVars.productName,
            artifactoryImageName: jobVars.dockerImageName,
            imageTags: jobVars.dockerImageTagsList,
            shouldPromoteImageTagsToRelease: jobVars.dockerImagePromoteFlag,
            customArgsList: "--no-cache"
            // customArgsList: "--no-cache --build-arg ARG=$ARG"
        ])
    }
}
 
// Deploy to Kubernetes
void deployToK8S() {
    stage('Deploy to K8S') {
        kubernetesUtils.withKuberDeployer(
            clusterName: jobVars.k8sCluster,
            lmSaCredentialsId: GlobalVars.serviceAccount
        ) {
 
                // Set env vars for generating helm values
                env.K8S_CLUSTER  = jobVars.k8sCluster
                env.APP_NAME     = GlobalVars.appName
                env.DOCKER_TAG   = jobVars.dockerImageTagsList[0]
                env.DOCKER_IMAGE = "docker-${GlobalVars.productName}.art.lmru.tech/${jobVars.dockerImageName}"
                env.INGRESS_HOSTNAME = "${jobVars.k8sNamespace}-${jobVars.k8sCluster}.apps.lmru.tech"
                // Edit file and replace placeholders with values and secrets
                jenkinsUtils.envsubst(".helm/values.yaml")
 
                println "DEPLOYING TO CLUSTER '${jobVars.k8sCluster}' IN NAMESPACE '${jobVars.k8sNamespace}'"
                sh """
                    chmod 400 /root/.kube/config
                    helm3 upgrade --install ${GlobalVars.appName} .helm -n ${jobVars.k8sNamespace} --create-namespace \
                    --atomic --timeout 5m
                """
                    // --dry-run --debug
 
        }
    }
}
