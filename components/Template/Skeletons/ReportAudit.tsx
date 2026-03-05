import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { CaretOrder } from "../Filter/CaretOrder";

export function ReportAuditSkeleton() {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col gap-2 px-3 pb-3">
      <table className="w-full text-[--textSecondary] text-sm border-separate border-spacing-y-2">
        <thead>
          <tr className="">
            <th className="px-3 py-3 rounded-l-xl font-medium text-left">
              <button
              onClick={() => null}
              type="button"
              className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
            >
              <span>Registro</span>
              <CaretOrder
                field={''}
                name="id"
                order={''}
              />
            </button>
            </th>
            <th className="px-3 py-3 font-medium text-left">
              <button
              onClick={() => null}
              type="button"
              className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
            >
              <span>Previsão</span>
              <CaretOrder
                field={''}
                name="expected_withdrawl_at"
                order={''}
              />
            </button>
            </th>
            <th className="px-3 py-3 font-medium text-left">
              <button
              onClick={() => null}
              type="button"
              className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
            >
              <span>Entrega</span>
              <CaretOrder
                field={''}
                name="withdrawl_at"
                order={''}
              />
            </button>
            </th>
            <th className="px-3 py-3 font-medium text-left">
              <button
              onClick={() => null}
              type="button"
              className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
            >
              <span>Colaborador</span>
              <CaretOrder
                field={''}
                name="collaborator"
                order={''}
              />
            </button>
            </th>
            <th className="px-3 py-3 font-medium text-left">
              <button
              onClick={() => null}
              type="button"
              className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
            >
              <span>Equipamento</span>
              <CaretOrder
                field={''}
                name="equipment"
                order={''}
              />
            </button>
            </th>
            <th className="px-2 py-3 font-medium text-right">
              <button
              onClick={() => null}
              type="button"
              className="flex justify-end items-center gap-2 hover:opacity-60 w-full truncate transition-all duration-300"
            >
              <span>Qtd</span>
              <CaretOrder
                field={''}
                name="quantity"
                order={''}
              />
            </button>
            </th>
            <th className="items-end px-3 py-3 rounded-r-xl font-medium text-right">
              <button
              onClick={() => null}
              type="button"
              className="flex justify-end items-center gap-2 hover:opacity-60 w-full truncate transition-all duration-300"
            >
              <span>Valor</span>
              <CaretOrder
                field={''}
                name="amount"
                order={''}
              />
            </button>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="">
            <td colSpan={7} className="rounded-xl">
              <Skeleton className="rounded-xl w-full h-[52px]" />
            </td>
          </tr>
          <tr className="">
            <td colSpan={7} className="rounded-xl">
              <Skeleton className="rounded-xl w-full h-[52px]" />
            </td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  )
}