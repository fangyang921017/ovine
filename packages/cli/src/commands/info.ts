import chalk from 'chalk'
import fse from 'fs-extra'
import semver from 'semver'

import { dllVer, domain, libVer } from '../constants'
import { getPkgLatestVer, getPkgName } from '../utils'

type InfoType = 'version'
type InfoOptions = {
  siteDir: string
}

const types = ['version']

export async function info(type: InfoType, options: InfoOptions): Promise<void> {
  switch (type) {
    case types[0]:
      printVersionInfo(options)
      break
    default:
      console.log(`Please input info type. Optional Type: ${types.join(',')}`)
  }
}

function printVersionInfo(options: InfoOptions) {
  const { siteDir } = options
  const verInfo: any = {}
  const modulesDir = `${siteDir}/node_modules/`

  console.log(`\n${chalk.grey('loading version info...')}`)

  const latestVer = getPkgLatestVer()

  fse.readdir(`${modulesDir}${getPkgName()}`).then((dirs) => {
    dirs.forEach((pkg) => {
      const pkgName = getPkgName(pkg as any)
      const pkgPath = `${modulesDir}${pkgName}/package.json`
      const {version} = require(pkgPath)
      verInfo[pkgName] = {
        version,
        remark: semver.eq(libVer, version) ? '--' : `"${pkg}" ver should same as "cli".`,
      }
    })

    verInfo[getPkgName('cli')] = {
      version: libVer,
      remark: `required dll version: ${dllVer}`,
    }

    console.log(`\n${chalk.cyan('Ovine verion info:')}\n`)
    console.table(verInfo)

    if (semver.eq(libVer, latestVer)) {
      console.log(`\n${chalk.green('Ovine already up-to-date.')}\n`)
    } else {
      console.log(`\nOvine latest version: ${chalk.green(latestVer)}\n`)
    }

    if (semver.lt(libVer, latestVer) && semver.eq(semver.coerce(latestVer) || '0.0.1', latestVer)) {
      console.log(
        `${chalk.yellowBright(
          'The installed Ovine is outdate.'
        )} Please install the latest version.\n`
      )
    }

    console.log(`Ovine changelog doc: ${chalk.blueBright(`${domain.libDoc}org/blog/changelog/`)}\n`)
  })
}
