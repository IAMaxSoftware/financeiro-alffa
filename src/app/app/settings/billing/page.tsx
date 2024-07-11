import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { auth } from '@/services/auth'

export default async function Page() {
  const session = await auth()

  return (
    <form>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Uso do Plano</CardTitle>
          <CardDescription>
            Você está atualmente no{' '}
            <span className="font-bold uppercase">Plano FREE</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                R$ 0
              </span>
              <span className="text-muted-foreground text-sm">
                0%
              </span>
            </header>
            {/* <main>
              <Progress value={plan.quota.TASKS.usage} />
            </main> */}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-border pt-6">
          <span>Para um maior limite, assine o PRO</span>
          <Button type="submit">Assine por R$99/ mês</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
