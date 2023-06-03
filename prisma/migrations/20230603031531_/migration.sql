-- AddForeignKey
ALTER TABLE "testimoni" ADD CONSTRAINT "testimoni_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
