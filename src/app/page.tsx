'use client';

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { ClipboardDocumentIcon, ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// 编码市场 - 预设编码集合
const ENCODING_PRESETS = {
  dishes: {
    name: '报菜名',
    description: '相声《报菜名》中的经典菜名',
    chars: [
      '蒸羊羔', '蒸熊掌', '蒸鹿尾儿', '烧花鸭', '烧雏鸡', '烧子鹅', '卤猪', '卤鸭',
      '酱鸡', '腊肉', '松花小肚儿', '晾肉', '香肠儿', '什锦苏盘儿', '熏鸡白肚儿', '清蒸八宝猪',
      '江米酿鸭子', '罐儿野鸡', '罐儿鹌鹑', '卤什件儿', '卤子鹅', '山鸡', '兔脯', '菜蟒',
      '银鱼', '清蒸哈什蚂', '烩鸭丝', '烩鸭腰', '烩鸭条', '清拌鸭丝', '黄心管儿', '焖白鳝',
      '焖黄鳝', '豆豉鲇鱼', '锅烧鲤鱼', '锅烧鲇鱼', '清蒸甲鱼', '抓炒鲤鱼', '抓炒对虾', '软炸里脊',
      '软炸鸡', '什锦套肠儿', '卤煮寒鸦儿', '麻酥油卷儿', '熘鲜蘑', '熘鱼脯', '熘鱼肚', '熘鱼片儿',
      '醋熘肉片儿', '烩三鲜', '烩白蘑', '烩鸽子蛋', '炒银丝', '烩鳗鱼', '炒白虾', '炝青蛤',
      '炒面鱼', '炒竹笋', '芙蓉燕菜', '炒虾仁儿', '烩虾仁儿', '烩腰花儿', '烩海参', '炒蹄筋儿'
    ]
  },
  poetry: {
    name: '古诗词',
    description: '经典古诗词中的优美词汇',
    chars: [
      '春', '花', '秋', '月', '夏', '雨', '冬', '雪', '山', '水', '风', '云', '日', '星', '夜', '晨',
      '江', '河', '湖', '海', '林', '树', '草', '叶', '鸟', '燕', '鹤', '凤', '龙', '虎', '马', '鹿',
      '梅', '兰', '竹', '菊', '荷', '桃', '柳', '松', '红', '绿', '青', '白', '黄', '紫', '金', '银',
      '琴', '棋', '书', '画', '诗', '词', '歌', '赋', '酒', '茶', '香', '墨', '笔', '纸', '砚', '印'
    ]
  },
  animals: {
    name: '动物世界',
    description: '可爱的动物名称集合',
    chars: [
      '猫', '狗', '兔', '鸟', '鱼', '马', '牛', '羊', '猪', '鸡', '鸭', '鹅', '虎', '狮', '熊', '象',
      '猴', '鹿', '狼', '狐', '鼠', '蛇', '龟', '蛙', '蝶', '蜂', '蚁', '蜘蛛', '螃蟹', '虾', '章鱼', '鲸',
      '鹰', '鸽', '燕', '鹤', '孔雀', '企鹅', '猫头鹰', '蝙蝠', '松鼠', '刺猬', '袋鼠', '考拉', '熊猫', '长颈鹿', '斑马', '河马',
      '犀牛', '骆驼', '驴', '骡', '鳄鱼', '蜥蜴', '变色龙', '海豚', '海豹', '海狮', '水母', '海星', '珊瑚', '贝壳', '蜗牛', '蚯蚓'
    ]
  },
  emoji: {
    name: 'Emoji表情',
    description: '常用的Emoji表情符号',
    chars: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
      '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
      '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
      '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥'
    ]
  },
  colors: {
    name: '颜色世界',
    description: '丰富多彩的颜色名称',
    chars: [
      '红', '橙', '黄', '绿', '青', '蓝', '紫', '粉', '白', '黑', '灰', '棕', '金', '银', '铜', '铁',
      '朱红', '深红', '鲜红', '玫红', '桃红', '樱红', '胭脂', '绯红', '橘红', '橙黄', '柠檬', '鹅黄', '嫩黄', '土黄', '金黄', '杏黄',
      '翠绿', '墨绿', '深绿', '浅绿', '嫩绿', '草绿', '森绿', '碧绿', '青绿', '蓝绿', '天蓝', '海蓝', '深蓝', '浅蓝', '宝蓝', '靛蓝',
      '紫红', '深紫', '浅紫', '淡紫', '紫罗兰', '薰衣草', '雪白', '乳白', '米白', '象牙白', '珍珠白', '银白', '炭黑', '墨黑', '漆黑', '乌黑'
    ]
  },
  standard: {
    name: '标准Base64',
    description: '标准Base64字符集',
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('')
  },
  hakima: {
    name: '哈基码',
    description: '网络流行的哈基米编码字符集',
    chars: [
      '哈', '基', '米', '南', '北', '绿', '豆', '阿', '西', '噶', '压', '库', '那', '鲁', '曼', '波',
      '欧', '马', '自', '立', '悠', '嗒', '步', '诺', '斯', '哇', '嗷', '冰', '踩', '背', '叮', '咚',
      '鸡', '大', '狗', '叫', '袋', '鼠', '兴', '奋', '剂', '出', '示', '健', '康', '码', '楼', '上',
      '下', '来', '带', '一', '段', '小', '白', '手', '套', '胖', '宝', '牛', '魔', '呵', '嘿', '喔'
    ]
  }
};

// 默认使用报菜名编码
const DEFAULT_DISHES = ENCODING_PRESETS.dishes.chars;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const [customChars, setCustomChars] = useState<string[]>(DEFAULT_DISHES);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [separator, setSeparator] = useState('|');
  const [useSeparator, setUseSeparator] = useState(true);
  const [autoSeparator, setAutoSeparator] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState('dishes');
  const [showMarket, setShowMarket] = useState(false);
  const [userEncodings, setUserEncodings] = useState<{[key: string]: {name: string, description: string, chars: string[]}}>({});
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportName, setExportName] = useState('');
  const [exportDescription, setExportDescription] = useState('');

  // 标准Base64字符集
  const STANDARD_BASE64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  // 从本地存储加载用户编码
  useEffect(() => {
    const saved = localStorage.getItem('userEncodings');
    if (saved) {
      try {
        setUserEncodings(JSON.parse(saved));
      } catch (e) {
        console.error('加载用户编码失败:', e);
      }
    }
  }, []);

  // 保存用户编码到本地存储
  const saveUserEncodings = (encodings: typeof userEncodings) => {
    localStorage.setItem('userEncodings', JSON.stringify(encodings));
    setUserEncodings(encodings);
  };

  // 解析txt文件内容
  const parseEncodingFile = (content: string): {name: string, description: string, chars: string[]} | null => {
    try {
      const lines = content.trim().split('\n').map(line => line.trim()).filter(line => line);
      
      if (lines.length < 3) {
        throw new Error('文件格式不正确，至少需要3行：名称、描述、字符集');
      }
      
      const name = lines[0].replace(/^名称[:：]\s*/, '');
      const description = lines[1].replace(/^描述[:：]\s*/, '');
      
      // 解析字符集，支持多种分隔符
      const charsLine = lines.slice(2).join(' ').replace(/^字符[:：]\s*/, '');
      let chars: string[];
      
      // 尝试不同的分隔符
      if (charsLine.includes(',')) {
        chars = charsLine.split(',').map(c => c.trim()).filter(c => c);
      } else if (charsLine.includes('|')) {
        chars = charsLine.split('|').map(c => c.trim()).filter(c => c);
      } else if (charsLine.includes(' ')) {
        chars = charsLine.split(/\s+/).filter(c => c);
      } else {
        // 按字符分割
        chars = charsLine.split('').filter(c => c.trim());
      }
      
      if (chars.length !== 64) {
        throw new Error(`字符集必须包含64个字符，当前有${chars.length}个`);
      }
      
      return { name, description, chars };
    } catch (e) {
      console.error('解析文件失败:', e);
      return null;
    }
  };

  // 处理文件上传
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.name.endsWith('.txt')) {
      alert('请选择txt文件');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const parsed = parseEncodingFile(content);
      
      if (parsed) {
        const key = `user_${Date.now()}`;
        const newEncodings = {
          ...userEncodings,
          [key]: parsed
        };
        saveUserEncodings(newEncodings);
        alert(`成功导入编码：${parsed.name}`);
      } else {
        alert('文件格式错误，请检查文件内容');
      }
    };
    
    reader.readAsText(file, 'UTF-8');
    event.target.value = ''; // 清空input
  };

  // 删除用户编码
  const deleteUserEncoding = (key: string) => {
    const newEncodings = { ...userEncodings };
    delete newEncodings[key];
    saveUserEncodings(newEncodings);
  };

  // 检查编码冲突（重复字符）
  const checkConflicts = () => {
    const conflicts: { char: string; positions: number[] }[] = [];
    const charMap = new Map<string, number[]>();
    
    // 统计每个字符出现的位置
    customChars.forEach((char, index) => {
      if (char.trim() !== '') {
        if (charMap.has(char)) {
          charMap.get(char)!.push(index);
        } else {
          charMap.set(char, [index]);
        }
      }
    });
    
    // 找出重复的字符
    charMap.forEach((positions, char) => {
      if (positions.length > 1) {
        conflicts.push({ char, positions });
      }
    });
    
    return conflicts;
  };

  // 检测是否存在歧义（字符重复或包含关系）
  const hasAmbiguity = () => {
    const chars = [...customChars, '='];
    
    // 检查重复字符
    const uniqueChars = new Set(chars);
    if (uniqueChars.size !== chars.length) {
      return true;
    }
    
    // 检查是否有字符是其他字符的子串
    for (let i = 0; i < chars.length; i++) {
      for (let j = 0; j < chars.length; j++) {
        if (i !== j && chars[i] && chars[j] && chars[j].includes(chars[i]) && chars[i] !== chars[j]) {
          return true;
        }
      }
    }
    
    return false;
  };

  // 检查分隔符是否与自定义字符冲突
  const hasSeparatorConflict = () => {
    if (!separator || separator.trim() === '') {
      return false;
    }
    
    // 检查分隔符是否与任何自定义字符相同或包含关系
    for (const char of customChars) {
      if (char && (char === separator || char.includes(separator) || separator.includes(char))) {
        return true;
      }
    }
    
    return false;
  };

  // 编码函数
  const encode = (text: string) => {
    try {
      // 检查编码冲突
      const conflicts = checkConflicts();
      if (conflicts.length > 0) {
        const firstConflict = conflicts[0];
        return `编码冲突：字符 "${firstConflict.char}" 在位置 ${firstConflict.positions.join(', ')} 重复出现，请修复冲突后重试`;
      }
      
      // 检查分隔符冲突
      if (useSeparator && hasSeparatorConflict()) {
        return '分隔符冲突：分隔符与编码字符存在冲突，请更换分隔符后重试';
      }
      
      // 将文本转换为标准Base64
      const standardBase64 = btoa(unescape(encodeURIComponent(text)));
      
      // 决定是否使用分隔符
      const shouldUseSeparator = autoSeparator ? hasAmbiguity() : useSeparator;
      
      // 替换为自定义字符
      let result = '';
      for (const char of standardBase64) {
        const index = STANDARD_BASE64.indexOf(char);
        if (index !== -1) {
          result += customChars[index];
        } else {
          result += char; // 保持填充字符 '='
        }
        
        if (shouldUseSeparator) {
          result += separator;
        }
      }
      
      // 移除最后一个分隔符（如果使用了分隔符）
      return shouldUseSeparator ? result.slice(0, -separator.length) : result;
    } catch {
      return '编码错误：请检查输入文本';
    }
  };

  // 解码函数
  const decode = (encodedText: string) => {
    try {
      // 检查编码冲突
      const conflicts = checkConflicts();
      if (conflicts.length > 0) {
        const firstConflict = conflicts[0];
        return `编码冲突：字符 "${firstConflict.char}" 在位置 ${firstConflict.positions.join(', ')} 重复出现，请修复冲突后重试`;
      }
      
      // 检查分隔符冲突（仅在使用分隔符时）
      if (encodedText.includes(separator) && hasSeparatorConflict()) {
        return '分隔符冲突：分隔符与编码字符存在冲突，请更换分隔符后重试';
      }
      
      let parts: string[];
      
      // 检测是否包含分隔符
      if (encodedText.includes(separator)) {
        // 按分隔符分割
        parts = encodedText.split(separator);
      } else {
        // 尝试智能分割（无分隔符模式）
        parts = smartSplit(encodedText);
      }
      
      // 将自定义字符转换回标准Base64
      let standardBase64 = '';
      for (const part of parts) {
        if (part === '=') {
          standardBase64 += '=';
        } else {
          const index = customChars.indexOf(part);
          if (index !== -1) {
            standardBase64 += STANDARD_BASE64[index];
          } else {
            throw new Error(`未知字符: ${part}`);
          }
        }
      }
      
      // 解码标准Base64
      return decodeURIComponent(escape(atob(standardBase64)));
    } catch {
      return '解码错误：请检查输入格式';
    }
  };

  // 智能分割函数（无分隔符时使用）
  const smartSplit = (text: string): string[] => {
    const result: string[] = [];
    let i = 0;
    
    while (i < text.length) {
      let found = false;
      
      // 首先尝试匹配填充字符
      if (text[i] === '=') {
        result.push('=');
        i++;
        continue;
      }
      
      // 按长度从长到短尝试匹配自定义字符
      const sortedChars = [...customChars].sort((a, b) => b.length - a.length);
      
      for (const char of sortedChars) {
        if (text.substring(i, i + char.length) === char) {
          result.push(char);
          i += char.length;
          found = true;
          break;
        }
      }
      
      if (!found) {
        throw new Error(`无法解析字符: ${text.substring(i)}`);
      }
    }
    
    return result;
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      setOutputText(encode(inputText));
    } else {
      setOutputText(decode(inputText));
    }
  };

  const handleCharChange = (index: number, value: string) => {
    const newChars = [...customChars];
    newChars[index] = value;
    setCustomChars(newChars);
  };

  const resetToDefault = () => {
    setCustomChars(DEFAULT_DISHES);
  };

  // 选择预设编码
  const selectPreset = (presetKey: string) => {
    // 先检查是否是内置预设
    const preset = ENCODING_PRESETS[presetKey as keyof typeof ENCODING_PRESETS];
    if (preset) {
      setCustomChars(preset.chars);
      setSelectedPreset(presetKey);
      setShowMarket(false);
      return;
    }
    
    // 检查是否是用户导入的编码
    const userPreset = userEncodings[presetKey];
    if (userPreset) {
      setCustomChars(userPreset.chars);
      setSelectedPreset(presetKey);
      setShowMarket(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      console.error('复制失败');
    }
  };

  // 处理导出对话框的打开
  const handleExportDialog = () => {
    const defaultName = selectedPreset ? 
      (ENCODING_PRESETS[selectedPreset as keyof typeof ENCODING_PRESETS]?.name || selectedPreset) : 
      '自定义编码';
    const defaultDescription = selectedPreset ? 
      (ENCODING_PRESETS[selectedPreset as keyof typeof ENCODING_PRESETS]?.description || '自定义编码方案') : 
      '自定义编码方案';
    
    setExportName(defaultName);
    setExportDescription(defaultDescription);
    setShowExportDialog(true);
  };

  // 执行导出
  const executeExport = () => {
    const name = exportName.trim() || '自定义编码';
    const description = exportDescription.trim() || '自定义编码方案';
    
    const content = `名称: ${name}\n描述: ${description}\n字符: ${customChars.join(',')}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setShowExportDialog(false);
  };



  // 导出用户编码为txt文件
  const exportUserEncoding = (encoding: { name: string; description: string; chars: string[] }) => {
    const content = `名称: ${encoding.name}\n描述: ${encoding.description}\n字符: ${encoding.chars.join(',')}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${encoding.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Colorful Base64
          </h1>
          <p className="text-lg text-gray-600">
            使用自定义字符集进行Base64编码和解码
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：编码/解码区域 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white text-blue-700 shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                    onClick={() => setMode('encode')}
                  >
                    编码
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white text-blue-700 shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                    onClick={() => setMode('decode')}
                  >
                    解码
                  </Tab>
                </Tab.List>
              </Tab.Group>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {mode === 'encode' ? '输入文本' : '输入编码'}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={mode === 'encode' ? '请输入要编码的文本...' : '请输入要解码的编码...'}
                />
              </div>

              {/* 分隔符设置 */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="text-sm font-medium text-gray-700">分隔符设置</h3>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="separatorMode"
                      checked={autoSeparator}
                      onChange={() => setAutoSeparator(true)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">智能分隔符</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="separatorMode"
                      checked={!autoSeparator}
                      onChange={() => setAutoSeparator(false)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">手动设置</span>
                  </label>
                </div>
                
                {!autoSeparator && (
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={useSeparator}
                        onChange={(e) => setUseSeparator(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">使用分隔符</span>
                    </label>
                    
                    {useSeparator && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">分隔符:</span>
                        <input
                          type="text"
                          value={separator}
                          onChange={(e) => setSeparator(e.target.value)}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="|"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  {autoSeparator ? (
                    hasAmbiguity() ? (
                      <span className="text-orange-600">⚠️ 检测到字符歧义，将自动使用分隔符</span>
                    ) : (
                      <span className="text-green-600">✓ 无字符歧义，将不使用分隔符</span>
                    )
                  ) : (
                    useSeparator ? (
                      hasSeparatorConflict() ? (
                        <span className="text-red-600">❌ 分隔符与编码字符冲突，请更换分隔符</span>
                      ) : (
                        <span>将使用 &quot;{separator}&quot; 作为分隔符</span>
                      )
                    ) : (
                      <span className="text-orange-600">⚠️ 不使用分隔符可能导致解码错误</span>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={handleProcess}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {mode === 'encode' ? '编码' : '解码'}
              </button>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {mode === 'encode' ? '编码结果' : '解码结果'}
                  </label>
                  {outputText && (
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="复制到剪贴板"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <textarea
                  value={outputText}
                  readOnly
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder={mode === 'encode' ? '编码结果将显示在这里...' : '解码结果将显示在这里...'}
                />
              </div>
            </div>
          </div>

          {/* 右侧：字符设置区域 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                自定义编码字符 (64个)
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowMarket(!showMarket)}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm px-3 py-1 border border-green-300 rounded-md hover:bg-green-50"
                  title="编码市场"
                >
                  <span>🏪</span>
                  <span>编码市场</span>
                </button>
                <button
                  onClick={handleExportDialog}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 text-sm"
                  title="导出当前编码"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>导出</span>
                </button>
                <button
                  onClick={resetToDefault}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                  title="重置为默认菜名"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  <span>重置</span>
                </button>
              </div>
            </div>

            {/* 编码市场 */}
            {showMarket && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <span className="mr-2">🏪</span>
                    编码市场
                  </h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="encoding-file-input"
                    />
                    <label
                      htmlFor="encoding-file-input"
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 cursor-pointer transition-colors"
                    >
                      📁 导入编码
                    </label>
                  </div>
                </div>
                
                {/* 内置编码 */}
                <div className="mb-4">
                  <h4 className="text-md font-medium text-gray-800 mb-2">内置编码</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(ENCODING_PRESETS).map(([key, preset]) => (
                    <div
                      key={key}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPreset === key
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                      }`}
                      onClick={() => selectPreset(key)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{preset.name}</h4>
                        {selectedPreset === key && (
                          <span className="text-green-600 text-sm">✓ 已选择</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{preset.description}</p>
                      <div className="text-xs text-gray-500">
                        预览: {preset.chars.slice(0, 6).join(' ')}...
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
                
                {/* 用户导入编码 */}
                {Object.keys(userEncodings).length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-md font-medium text-gray-800 mb-2">我的编码</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(userEncodings).map(([key, preset]) => (
                        <div
                          key={key}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all relative ${
                            selectedPreset === key
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                          }`}
                          onClick={() => selectPreset(key)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{preset.name}</h4>
                            <div className="flex items-center space-x-2">
                              {selectedPreset === key && (
                                <span className="text-green-600 text-sm">✓ 已选择</span>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  exportUserEncoding(preset);
                                }}
                                className="text-blue-500 hover:text-blue-700 text-xs"
                                title="导出编码"
                              >
                                💾
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm(`确定要删除编码 "${preset.name}" 吗？`)) {
                                    deleteUserEncoding(key);
                                  }
                                }}
                                className="text-red-500 hover:text-red-700 text-xs"
                                title="删除编码"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{preset.description}</p>
                          <div className="text-xs text-gray-500">
                            预览: {preset.chars.slice(0, 6).join(' ')}...
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 文件格式说明 */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-900 mb-2">📄 文件格式说明</h5>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• 第1行：编码名称（可选前缀 &quot;名称:&quot; 或 &quot;名称：&quot;）</p>
                    <p>• 第2行：编码描述（可选前缀 &quot;描述:&quot; 或 &quot;描述：&quot;）</p>
                    <p>• 第3行及以后：64个字符，支持逗号、竖线、空格分隔（可选前缀 &quot;字符:&quot; 或 &quot;字符：&quot;）</p>
                    <p>• 示例文件内容：</p>
                    <pre className="mt-2 p-2 bg-white rounded text-xs font-mono whitespace-pre-wrap break-all">
名称: 我的编码{"\n"}描述: 自定义字符集{"\n"}字符：A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9,+,/
                    </pre>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {customChars.map((char, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 w-6">{index}</span>
                  <input
                    type="text"
                    value={char}
                    onChange={(e) => handleCharChange(index, e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 text-xs">
              {(() => {
                const conflicts = checkConflicts();
                if (conflicts.length > 0) {
                  return (
                    <div className="text-red-600 bg-red-50 p-2 rounded border border-red-200">
                      <p className="font-medium">⚠️ 检测到编码冲突：</p>
                      {conflicts.map((conflict, index) => (
                        <p key={index} className="mt-1">
                          字符 &quot;{conflict.char}&quot; 在位置 {conflict.positions.join(', ')} 重复出现
                        </p>
                      ))}
                      <p className="mt-2 text-xs">请修复冲突后才能进行编解码操作</p>
                    </div>
                  );
                } else {
                  return (
                    <div className="text-green-600 bg-green-50 p-2 rounded border border-green-200">
                      <p>✅ 字符集无冲突，可以正常编解码</p>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* 导出对话框 */}
      {showExportDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">导出编码</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  编码名称
                </label>
                <input
                  type="text"
                  value={exportName}
                  onChange={(e) => setExportName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入编码名称"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  编码描述
                </label>
                <textarea
                  value={exportDescription}
                  onChange={(e) => setExportDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入编码描述"
                  rows={3}
                />
              </div>
              
              <div className="text-sm text-gray-500">
                <p>将导出包含 {customChars.length} 个字符的编码配置</p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowExportDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={executeExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                导出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
