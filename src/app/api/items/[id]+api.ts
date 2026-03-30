import {
  deleteGroceryItem,
  setGroceryItemPurchased,
  updateGroceryItemQuantity,
} from "@/lib/server/db-actions";

export async function PATCH(request: Request, { id }: { id: string }) {
  try {
    const body = await request.json();

    const item = body.quantity
      ? await updateGroceryItemQuantity(id, body.quantity)
      : await setGroceryItemPurchased(id, body.purchased ?? true);

    if (!item)
      return Response.json({ error: "Item not found" }, { status: 404 });

    return Response.json({ item });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update(patch) item";

    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { id }: { id: string }) {
  try {
    await deleteGroceryItem(id);

    return Response.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete item";

    return Response.json({ error: message }, { status: 500 });
  }
}

/**
 * Dynamic API route di expo :
 *
 *   Untuk mengimplementasikan dynamic route di dalam expo project hal utama yang dilakukkan tentu
 *  penamaan file dengan kurung siku ([]), kemudian di tambahkan +api yang merupakan mark resmi dari
 *  expo.
 *
 * Pengambilan Value :
 *   Untuk mengamnil value dari dynamic API route nya adalah dengan mengekstrak variabel di dalam kurung siku
 *  {variabel} kemudian di distructuring tepat pada -- parameter kedua -- Jadi dia harus di parameter kedua
 *  dengan nama yang sama misal [id] = {id} | [name] = {name}. Dan untuk mengakali agar kita ada 2 parameter
 *  pada function ROUTE api maka -- Silahkan Gunakan Private Params request dengan menambahkan underscore (_)
 *  sebelum nama variabel request nya --.
 */
