const fs = require('fs')
const Path = require('path')

const getDirObject = async (baseDir = '/') => {
    try {
        const dirArray = await fs.promises.readdir(baseDir, { withFileTypes: true })

        const fileObject = {
            baseDir
        }

        for (let i = 0; i < dirArray.length; i++) {
            const currDir = dirArray[i]
            const currPath = Path.join(baseDir, currDir.name)
            if (currDir.isFile()) {
                fileObject[currDir.name] = await fs.promises.readFile(currPath)
            } else if (currDir.isDirectory()) {
                fileObject[currDir.name] = await getDirObject(currPath)
            }
        }

        return fileObject
    } catch (e) {
        console.log(e)
    }
}

const getFileObject = async (dir) => {
    const fileObject = await getDirObject(dir)
    console.log(fileObject)
    return fileObject
}

getFileObject(__dirname)
