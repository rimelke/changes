import IChange from './IChange'
import IDraft from './IDraft'

interface IDetailedDraft extends IDraft {
  changes: IChange[]
}

export default IDetailedDraft
