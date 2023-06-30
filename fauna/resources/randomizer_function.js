import faunadb from "faunadb"

const q = faunadb.query
const { CreateFunction, Query, Var, Lambda, Modulo, Add, Multiply, Role, Update, Select, Get, Let, Function } = q

const CreateFunctionRandomizer = CreateFunction({
  name: "randomizer",
  role: Role("user"),
  body: Query(
    Lambda(
      ["defaultValue"],
      Let(
        {
          seed: Select(["data", "seed"], Get(Function("randomizer")), Var("defaultValue")),
          nextSeed: Modulo(Add(Multiply(1839567234, Var("seed")), 972348567), 8239451023),
          functionUpdate: Update(Function("randomizer"), {
            data: { seed: Var("nextSeed") },
          }),
        },
        Var("nextSeed")
      )
    )
  ),
})

export default CreateFunctionRandomizer
