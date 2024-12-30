export const ApiEndPoints = {
  base_url_admin: process.env.NEXT_PUBLIC_APP_BASE_URL_API_ADMIN_ROOT,
  base_url_sandbox: process.env.NEXT_PUBLIC_APP_BASE_URL_API_SANDBOX_ROOT,

  jsonrpc: "2.0+hl",
  id: 1,
  version: 1,

  // auth
  sign_in_init: "hladmin:sign_in:init",
  sign_in_challenge_reply: "hladmin:sign_in:challenge_reply",
  sign_in_rechallenge: "hladmin:sign_in:rechallenge",
  create_firebase_dummy_user: "create:dummy:user",
  sign_out: "hladmin:sign_out",
  get_user: "cdr:user:get",

  // rls
  rls_attach: "rls:attach",
  rls_detach: "rls:detach",
  hl_session_list: "hlsession:list",

  // dashboard analytics
  anaylytics_list: "hlsession:attribute:aggregate",
  
  // data explore
  data_expore_cdr_get: "dataex:cdr:get",
  data_expore_revision_list: "dataex:cdr:revision:list",
  data_expore_esr_query: "dataex:esr:query",

  // sandbox
  sandbox_list: "sandbox:list",
  sandbox_run: "sandbox:run",
};
