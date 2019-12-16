#!/usr/bin/expect

spawn "$env(TIKA_CCLOUD_BIN_PATH)" login

expect "Email: "

send -- "$env(TIKA_CC_USER)\r"

expect "Password: "

send -- "$env(TIKA_CC_PASS)\r"

expect eof
