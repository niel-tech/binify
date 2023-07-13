import faunadb from "faunadb"

const q = faunadb.query
const {
  CreateFunction,
  Query,
  Var,
  Lambda,
  Map,
  Role,
  Concat,
  Length,
  FindStrRegex,
  Space,
  Let,
  Modulo,
  Divide,
  Multiply,
  ToNumber,
  NewId,
  SubString,
} = q

const CreateFunctionRandomString = CreateFunction({
  name: "randomString",
  role: Role("user"),
  body: Query(
    Lambda(
      ["length"],
      Let(
        {
          alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          alphabetLength: Length(Var("alphabet")),
        },
        Concat(
          Map(
            FindStrRegex(Space(Var("length")), "\\s"),
            Lambda(
              "_",
              Let(
                {
                  randomInt: Modulo(
                    Divide(
                      Multiply(Divide(ToNumber(NewId()), 123), Divide(ToNumber(NewId()), 456)),
                      Divide(ToNumber(NewId()), 789)
                    )
                  ),
                  pos: Modulo(Var("randomInt"), Var("alphabetLength")),
                },
                SubString(Var("alphabet"), Var("pos"), 1)
              )
            )
          )
        )
      )
    )
  ),
})

export default CreateFunctionRandomString
