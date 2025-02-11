import { Dragon } from "@/utils/types/dragon";
import EditForm from "./editForm";
import styles from "./style.module.scss";
import api from "@/utils/axios";
import { protectedRoute } from "@/utils/protectedRoute";
import DragonImage from "@/app/components/dragonImage/dragonImage";
export default async function EditDragon({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await protectedRoute();
  
  const id = (await params).id
  const dragonData: Dragon = (await api.get("/" + id)).data;

  return (
    <>
      <div className={styles.EditDragon}>
        <DragonImage dragon={dragonData} />
        <EditForm dragon={dragonData} />
      </div>
    </>
  );
}
