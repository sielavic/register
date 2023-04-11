<?php    
public function register(Request $request)
    {
        $data =[];
        //здесь проверка логина на уникальность
        $name = User::where('name', $request->name)->first();
        if ( !is_null($name) || empty($request->name)){
            $data[] = [
                'fail_name'=>'name'
            ];
        }

        //емаил чек
        $email = User::where('email', $request->email)->first();
        if ( !is_null($email)|| empty($request->email)){
            $data[] = [
                'fail_email'=>'email'
            ];

        }

       //проверка пароля
        if ( strlen($request->password  < 6) || empty($request->password)){
            $data[] = [
                'fail_pass'=>'pass'
            ];
        }
        if (!empty($data)){
            return response()->json($data);
        }



        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);


        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
