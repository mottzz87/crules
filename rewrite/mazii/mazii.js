(function(){return eval('try {\n    let _0x4b27e6 = $response[\'body\'], _0x31f778 = JSON[\'parse\'](_0x4b27e6);\n    if ($request[\'url\'][\'includes\'](\'loginWith\') || $request[\'url\'][\'includes\'](\'init-login\')) {\n        _0x31f778[\'result\'][\'premium\'] = !![], _0x31f778[\'result\'][\'lifetime\'] = 1, _0x31f778[\'result\'][\'active\'] = 1, _0x31f778[\'result\'][\'status\'] = 1;\n        const _0xe51103 = new Date(), _0x536e67 = new Date(_0xe51103[\'setFullYear\'](_0xe51103[\'getFullYear\']() + 100));\n        _0x31f778[\'result\'][\'premium_date\'] = \'2025-01-01\\\\x2000:00:00\', _0x31f778[\'result\'][\'premium_expired_date\'] = _0x536e67[\'toISOString\']()[\'split\'](\'T\')[0] + \'\\\\x2023:59:59\', _0x31f778[\'result\'][\'premium_ai_expired\'] = _0x536e67[\'toISOString\']()[\'split\'](\'T\')[0] + \'\\\\x2023:59:59\', _0x31f778[\'result\'][\'premium_used_today\'] = 0;\n    }\n    $done({ \'body\': JSON[\'stringify\'](_0x31f778) });\n} catch (_0x215b89) {\n    $done({});\n}');}());