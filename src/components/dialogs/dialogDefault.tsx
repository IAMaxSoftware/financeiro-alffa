import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


type DialogParams = {
    title: string;
    descricao: string;
    Children: JSX.Element;
    ButtonOpen:JSX.Element;
    size:number;
  }

 
export function DialogDefault({
    title ='',
    Children,
    ButtonOpen,
    descricao='',
    size= 425,

}:DialogParams) {

  const classe = 'sm:max-w-['+size+'px]'
  return (
    <Dialog>
      <DialogTrigger asChild>
        {ButtonOpen}
      </DialogTrigger>
      <DialogContent className={classe}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {descricao}
          </DialogDescription>
        </DialogHeader>
            {Children}
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}