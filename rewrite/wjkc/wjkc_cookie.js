(function(){return eval('!((async () => {\n    const _0x4137f9 = \'CookieWJKC\', _0x45c1e4 = () => {\n            try {\n                const _0x452f39 = $persistentStore[\'read\'](\'WJKC_ACCOUNT_MAP\');\n                return JSON[\'parse\'](_0x452f39 || \'{}\');\n            } catch (_0x206a0d) {\n                return {};\n            }\n        }, _0xb6bab8 = (_0x5e82e3, _0x926fd1) => {\n            const _0x2b5389 = [...new Set([\n                        ...Object[\'keys\'](_0x5e82e3),\n                        _0x926fd1\n                    ])], _0x26dce9 = {};\n            return _0x2b5389[\'sort\']()[\'forEach\']((_0x1d3767, _0x1d0d0e) => {\n                _0x26dce9[_0x1d3767] = _0x1d0d0e === 0 ? _0x4137f9 : \'\' + _0x4137f9 + _0x1d0d0e;\n            }), _0x26dce9;\n        }, _0x576504 = _0x40b865 => {\n            if (typeof atob === \'function\')\n                return atob(_0x40b865);\n            const _0x39800e = \'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\';\n            _0x40b865 = _0x40b865[\'replace\'](/[^A-Za-z0-9+/=]/g, \'\');\n            let _0x1fed57 = \'\';\n            for (let _0x2d7c9a = 0; _0x2d7c9a < _0x40b865[\'length\']; _0x2d7c9a += 4) {\n                const _0x2e974f = _0x39800e[\'indexOf\'](_0x40b865[_0x2d7c9a] || \'A\'), _0x1c8279 = _0x39800e[\'indexOf\'](_0x40b865[_0x2d7c9a + 1] || \'A\'), _0x292cc1 = _0x39800e[\'indexOf\'](_0x40b865[_0x2d7c9a + 2] || \'A\'), _0x1d6342 = _0x39800e[\'indexOf\'](_0x40b865[_0x2d7c9a + 3] || \'A\');\n                _0x1fed57 += String[\'fromCharCode\'](_0x2e974f << 2 | _0x1c8279 >> 4, (_0x1c8279 & 15) << 4 | _0x292cc1 >> 2, (_0x292cc1 & 3) << 6 | _0x1d6342);\n            }\n            return _0x1fed57[\'replace\'](/[^\\x20-\\x7E]/g, \'\');\n        };\n    try {\n        let _0x1c1f51;\n        try {\n            if (typeof $request[\'body\'] === \'string\')\n                _0x1c1f51 = JSON[\'parse\']($request[\'body\']);\n            else {\n                if (typeof $request[\'body\'] === \'object\')\n                    _0x1c1f51 = $request[\'body\'];\n                else\n                    throw new Error(\'意外的请求体类型:\\\\x20\' + typeof $request[\'body\']);\n            }\n        } catch (_0x2aee88) {\n            throw new Error(\'请求数据格式错误\');\n        }\n        if (!_0x1c1f51 || !_0x1c1f51[\'data\'])\n            throw new Error(\'请求数据缺少data字段\');\n        const _0x2615c3 = _0x576504(_0x1c1f51[\'data\']);\n        let _0x5a67bb;\n        try {\n            _0x5a67bb = JSON[\'parse\'](_0x2615c3);\n        } catch (_0x1f59e9) {\n            throw new Error(\'解码数据格式错误\');\n        }\n        const _0x4aa7a3 = _0x5a67bb[\'email\'];\n        if (!_0x4aa7a3)\n            throw new Error(\'未找到邮箱信息\');\n        const _0x17ae3f = _0x45c1e4(), _0x334e95 = _0xb6bab8(_0x17ae3f, _0x4aa7a3);\n        $persistentStore[\'write\'](JSON[\'stringify\'](_0x334e95), \'WJKC_ACCOUNT_MAP\');\n        const _0xcfefe5 = _0x334e95[_0x4aa7a3];\n        $persistentStore[\'write\'](JSON[\'stringify\']({\n            \'email\': _0x4aa7a3,\n            \'cookieKey\': _0xcfefe5\n        }), \'WJKC_TEMP\'), $notification[\'post\'](\'WJKC\\\\x20Cookie\', \'更新成功\', \'账号:\\\\x20\' + _0x4aa7a3);\n    } catch (_0x549e67) {\n        $notification[\'post\'](\'WJKC\\\\x20Cookie\', \'更新失败\', _0x549e67[\'message\']);\n    }\n    $done({});\n})());');}());